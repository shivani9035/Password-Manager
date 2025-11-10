

import React, { useState, useEffect } from 'react'

const LockPage = ({ onUnlock }) => {
  const [password, setPassword] = useState("")
  const [storedPassword, setStoredPassword] = useState(null)
  const [isCreating, setIsCreating] = useState(false)
  const [message, setMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false) 

  useEffect(() => {
    const saved = localStorage.getItem("appPassword")
    if (saved) {
      setStoredPassword(saved)
    } else {
      setIsCreating(true)
    }
  }, [])

  const handleSubmit = () => {
    if (isCreating) {
      if (password.length < 4) {
        setMessage("Password must be at least 4 characters.")
        return
      }
      localStorage.setItem("appPassword", password)
      setMessage("Password created successfully! Please refresh or reopen app.")
      setIsCreating(false)
    } else {
      if (password === storedPassword) {
        setMessage("Unlocked successfully!")
        onUnlock()
      } else {
        setMessage("Incorrect password. Try again.")
      }
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-[85vh]">
      <div className="bg-cyan-100 shadow-xl rounded-2xl p-10 border border-green-400 w-80 text-center">
        <h1 className="text-2xl font-bold mb-4 text-green-600">
          {isCreating ? "Create Lock Password" : "Enter Lock Password"}
        </h1>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={isCreating ? "Set new password" : "Enter your password"}
          className="border border-green-400 rounded-full w-full p-2 mb-4 text-center outline-none"
        />

        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-400 text-shadow-white font-semibold px-6 py-2 rounded-full w-full"
        >
          {isCreating ? "Create Password" : "Unlock"}
        </button>

        {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
      </div>
    </div>
  )
}

export default LockPage

/*import React, { useState, useEffect } from 'react'
import { Eye, EyeOff } from 'lucide-react' // 👁️ import eye icons

const LockPage = ({ onUnlock }) => {
  const [password, setPassword] = useState("")
  const [storedPassword, setStoredPassword] = useState(null)
  const [isCreating, setIsCreating] = useState(false)
  const [message, setMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false) // 🔹 default hidden

  useEffect(() => {
    const saved = localStorage.getItem("appPassword")
    if (saved) {
      setStoredPassword(saved)
    } else {
      setIsCreating(true)
    }
  }, [])

  const handleSubmit = () => {
    if (isCreating) {
      if (password.length < 4) {
        setMessage("Password must be at least 4 characters.")
        return
      }
      localStorage.setItem("appPassword", password)
      setMessage("Password created successfully! Please refresh or reopen app.")
      setIsCreating(false)
    } else {
      if (password === storedPassword) {
        setMessage("Unlocked successfully!")
        onUnlock()
      } else {
        setMessage("Incorrect password. Try again.")
      }
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-[85vh]">
      <div className="bg-cyan-100 shadow-xl rounded-2xl p-10 border border-green-400 w-80 text-center">
        <h1 className="text-2xl font-bold mb-4 text-green-600">
          {isCreating ? "Create Lock Password" : "Enter Lock Password"}
        </h1>

        {/* 🔹 Password Input with Eye Toggle */
      /*  <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={isCreating ? "Set new password" : "Enter your password"}
            className="border border-green-400 rounded-full w-full p-2 mb-4 text-center outline-none pr-10"
          />

          {/* 👁️ Eye toggle button */
         /* <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-green-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-400 text-shadow-white font-semibold px-6 py-2 rounded-full w-full"
        >
          {isCreating ? "Create Password" : "Unlock"}
        </button>

        {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
      </div>
    </div>
  )
}

export default LockPage*/
