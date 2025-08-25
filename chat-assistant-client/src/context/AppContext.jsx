import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { dummyChats, dummyUserData } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios"

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [token, setToken] = useState(localStorage.getItem("token") || null)
  const [loadingUser,setLoadingUser] = useState(true)
  const [allUsers,setAllUsers] = useState([])

  //for admin
  const [faqs,setFaqs] = useState([])
  const [documents,setDocuments] = useState([])

  console.log(documents,"111223")

  const fetchUser = async () => {
    console.log(token,"Token")
    try{
      const {data} = await axios.get("/api/auth/data",{headers:{Authorization: `Bearer ${token}` }})
      console.log(data,"user data")
      if(data.success){
        setUser(data.user)
      }else{
        toast.error(data.message)
      }
    }catch(error){
        toast.error(error.message)
    }finally{
      setLoadingUser(false)
    }
  };

  const createNewChat = async()=>{
    try{
      if(!user) return toast("Login to create a new chat")
        navigate("/")
      await axios.get("/api/chat/create",{headers:{Authorization: `Bearer ${token}` }})
      await fetchUsersChats()
    }catch(error){
      toast.error(error.message)
    }
  }

  const fetchUsersChats = async () => {
    try{
      const {data} = await axios.get('/api/chat/get',{
        headers:{Authorization: `Bearer ${token}` }
      })
      console.log(data,"chat data")
      if(data.success){
        setChats(data.chats)
        //If the user has no chats, create one 
        if(data.chats.length === 0){
          await createNewChat();
          return fetchUsersChats()
        }else{
          setSelectedChat(data.chats[0])
        }
      }else{
        toast.error(data.message)
      }

    }catch(error){
       toast.error(error.message)
    }
  };


    const fetchAllUsers = async()=>{
    try{
       const {data} = await axios.get('/api/auth/all-users',{
        headers:{Authorization: `Bearer ${token}` }
      })
      if(data.success){
        setAllUsers(data.users)
      }
      // console.log(data,"dddddddddddddddd")

    }catch(error){
       toast.error(error.message)
    }
  }


  //For admin fqas
  const fetchFAQs = async()=>{
    try{
       const {data} = await axios.get('/api/admin/faq-all',{
        headers:{Authorization: `Bearer ${token}` }
      })
      if(data.success){
        setFaqs(data.faq)
      }
      // console.log(data,"dddddddddddddddd")

    }catch(error){
       toast.error(error.message)
    }
  }

    const fetchDocs = async()=>{
    try{
       const {data} = await axios.get('/api/admin/doc-all',{
        headers:{Authorization: `Bearer ${token}` }
      })
      console.log("my doc",data)
      if(data.success){
        setDocuments(data.documents)
      }

    }catch(error){
       toast.error(error.message)
    }
  }
  

  useEffect(()=>{
    fetchAllUsers(),
    fetchFAQs(),
    fetchDocs()
  },[])

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    if (user) {
      fetchUsersChats();
    } else {
      setChats([]);
      setSelectedChat(null);
    }
  }, [user]);

  useEffect(() => {
    if(token){
      fetchUser();
    }else{
      setUser(null)
      setLoadingUser(false)
    }
  }, [token]);

  const value = {
    navigate,
    user,
    setUser,
    fetchUser,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    theme,
    setTheme,
    createNewChat,
    loadingUser,
    fetchUsersChats,
    token,
    setToken,
    axios,
    allUsers,
    faqs,documents
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
