

import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'
import LockPage from './components/LockPage'

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false)

  useEffect(() => {
    const storedPassword = localStorage.getItem("appPassword")
    if (!storedPassword) {
      setIsUnlocked(false)
    }
  }, [])

  return (
    <>
      <Navbar />
      
      <div className="bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] justify-center ">
        {!isUnlocked ? (
          <LockPage onUnlock={() => setIsUnlocked(true)} />
        ) : (
          <Manager />
        )}
      </div>
      <Footer />
    </>
  )
}

export default App

