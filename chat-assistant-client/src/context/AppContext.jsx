// import { Children, createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import { dummyChats, dummyUserData } from "../assets/assets";

// const AppContext = createContext()

// export const AppContextProvider = ({Children})=>{

//     const navigate = useNavigate()
//     const [user,setUser] = useState(null)
//     const [chats,setChats] = useState([])
//     const [selectedChat,setSelectedChat] = useState(null)
//     const [theme,setTheme] = useState(localStorage.getItem("theme")||'light')
    
//     const fetchUser = async()=>{
//         setUser(dummyUserData)
//     }

//     const fetchUsersChats = async ()=>{
//         setChats(dummyChats)
//         setSelectedChat(dummyChats[0])
//     }

//     useEffect(()=>{
//         if(theme === "dark"){
//             document.documentElement.classList.add("dark")
//         }else{
//             document.documentElement.classList.remove("dark")
//         }
//     },[theme])

//     useEffect(()=>{
//         if(user){
//             fetchUsersChats()
//         }else{
//             setChats([])
//             setSelectedChat(null)
//         }
//     },[user])

//     useEffect(()=>{
//       fetchUser()
//     },[])
//     const value = {
//         navigate, user, setUser, fetchUser, chats, setChats, selectedChat, setSelectedChat, theme, setTheme
//     }
//     return (
//         <AppContext.Provider value={value}>
//             {Children}
//         </AppContext.Provider>
//     )
// }

// export const useAppContext = () => useContext(AppContext)






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
    fetchUsersChats,token,setToken,axios
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
