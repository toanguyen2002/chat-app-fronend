import { useState } from 'react'
import './App.css'
import MainComponent from './Component/MainComponent'
import LoginComponent from './Component/LoginComponent'
import WordArea from './Component/WordArea'
import { Route, Routes } from 'react-router-dom'
import ChatAreaComponent from './Component/ChatAreaComponent'
import RegisterComponent from './Component/RegisterComponent'
import ResetPassWord from './Component/ResetPassWord'



function App() {
  const [count, setCount] = useState(0)
  return (

    <div className='App'>
      {/* <MainComponent /> */}
      <Routes>
        <Route path='/' element={<LoginComponent />} />
        <Route path='app' element={<MainComponent />} >
          <Route path='welcome' element={<WordArea />} />
          <Route path='chat/:id' element={<ChatAreaComponent />} />
        </Route>
        <Route path='register' element={<RegisterComponent />} />
        <Route path='resetPass' element={<ResetPassWord />} />
      </Routes>
    </div>

  )
}

export default App
