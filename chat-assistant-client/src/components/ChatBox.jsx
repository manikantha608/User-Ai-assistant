import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Message from './Message'
import toast from 'react-hot-toast'

const ChatBox = () => {
  const { selectedChat, theme, user, axios, token } = useAppContext()
  const containerRef = useRef(null)
  const bottomRef = useRef(null)

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [mode, setMode] = useState("text")

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!user) return toast("Login to send message")

      setLoading(true)
      const promptCopy = prompt
      setPrompt("")

      // Optimistically add user's message
      setMessages(prev => [...prev, {
        role: "user",
        content: promptCopy,
        timestamp: Date.now(),
        isImage: false
      }])

      const { data } = await axios.post(`/api/message/${mode}`,
        { chatId: selectedChat._id, prompt: promptCopy },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        setMessages(prev => [...prev, data.reply])
      } else {
        toast.error(data.message)
        setPrompt(promptCopy)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Load chat messages when chat changes
  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages || [])
    }
  }, [selectedChat])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  return (
    <div className="flex-1 flex flex-col m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40">

      {/* Scrollable Messages Area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto space-y-3 p-2 mb-2"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 mt-20">
            <img
              src={theme === "dark" ? assets.logo_full : assets.logo_full_dark}
              className="w-full max-w-56 sm:max-w-68"
              alt="Logo"
            />
            <p className="mt-5 text-3xl sm:text-5xl text-center text-gray-400 dark:text-white">
              Ask me anything.
            </p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <Message key={index} message={message} />
            ))}

            {loading && (
              <div className="loader flex items-center gap-1.5 pl-4">
                <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-white animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-white animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
              </div>
            )}

            {/* Dummy div to scroll into view */}
            <div ref={bottomRef} />
          </>
        )}
      </div>

      {/* Input Box */}
      <form
        onSubmit={onSubmit}
        className="mt-2 bg-primary/20 dark:bg-[#583C79]/30 border border-primary dark:border-[#80609F]/30 rounded-full w-full max-w-2xl p-3 pl-4 mx-auto flex gap-4 items-center"
      >
        <select
          onChange={(e) => setMode(e.target.value)}
          value={mode}
          className="text-sm pl-3 pr-2 outline-none bg-transparent"
        >
          <option className="dark:bg-purple-900" value="text">Text</option>
          <option className="dark:bg-purple-900" value="image">Image</option>
        </select>

        <input
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          type="text"
          placeholder="Type your prompt here..."
          className="flex-1 w-full text-sm outline-none bg-transparent"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="flex items-center"
        >
          <img
            src={loading ? assets.stop_icon : assets.send_icon}
            className="w-7 cursor-pointer"
            alt="Send"
          />
        </button>
      </form>
    </div>
  )
}

export default ChatBox
