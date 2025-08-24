import { Route, Routes, useLocation } from "react-router-dom"

import ChatBox from "./components/ChatBox"
import Credits from "./pages/Credits"
import Community from "./pages/Community"
import Sidebar from "./components/Sidebar"
import { useContext, useState } from "react"
import { assets } from "./assets/assets"
import "./assets/prism.css"
import Loading from "./pages/Loading"
import { useAppContext } from "./context/AppContext"
import Login from "./pages/Login"
import {Toaster} from "react-hot-toast"

const App = () => {
  //for small screen menu
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const {pathname} = useLocation()
  const {user,loadingUser} = useAppContext()
  console.log(user,"myuser")
  if(pathname === "/loading" || loadingUser) return <Loading/>
  return (
    <>
    <Toaster/>
    {!isMenuOpen && <img src={assets.menu_icon} className="absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert" onClick={()=>setIsMenuOpen(true)}/>}

    {user ?(
      <div className="bg-gradient-to-b from-[#f7f7f7] to-[#eaeaea] dark:from-[#242124] dark:to-[#000000] dark:text-white min-h-screen">
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<ChatBox />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </div>
      </div>
    </div>
    ):(
      <div className="bg-gradient-to-b from-[#242124] to-[#000000] flex items-center justify-center h-screen w-screen">
        <Login/>
      </div>
    ) }

    
    
    </>
  )
}

export default App
