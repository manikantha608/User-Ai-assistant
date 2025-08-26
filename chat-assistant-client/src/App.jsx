import { Route, Routes, useLocation,Navigate } from "react-router-dom"

import ChatBox from "./components/ChatBox"
import Sidebar from "./components/Sidebar"
import { useContext, useState } from "react"
import { assets } from "./assets/assets"
import "./assets/prism.css"
import Loading from "./pages/Loading"
import { useAppContext } from "./context/AppContext"
import {Toaster} from "react-hot-toast"
import SignUp from "./pages/SignUp."

import FAQs from "./pages/FAQs"
import Documents from "./pages/Documents"
import AdminDashboard from "./pages/adminDashBoard"
import AdminSideBar from "./pages/adminSideBar"

const App = () => {
  //for small screen menu
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const {pathname} = useLocation()
  const {user,loadingUser,token} = useAppContext()

  if(pathname === "/loading" || loadingUser) return <Loading/>
  return (
    <>
    <Toaster/>
    {!isMenuOpen && <img src={assets.menu_icon} className="absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert" onClick={()=>setIsMenuOpen(true)}/>}

    {user ?
    (

    user.role=="user"?(
            <div className="bg-gradient-to-b from-[#f7f7f7] to-[#eaeaea] dark:from-[#242124] dark:to-[#000000] dark:text-white min-h-screen">
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<ChatBox />} />
          </Routes>
        </div>
      </div>
    </div>
    ):(
      <Routes>
         {/* Redirect non-admin routes to /admin */}
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/admin" element={<AdminSideBar/>}>
        <Route index element={<AdminDashboard/>}/>
        <Route path="faqs" element={<FAQs/>} />
        <Route path="documents" element={<Documents/> }/>
        </Route>
     
      </Routes>
    )
    ):(
      <div className="bg-gradient-to-b from-[#242124] to-[#000000] flex items-center justify-center h-screen w-screen">
        {/* <SignUp/> */}
        <Routes>
          <Route path="/*" element={<SignUp />} />
        </Routes>
      </div>
    ) }
    
    </>
  )
}

export default App
