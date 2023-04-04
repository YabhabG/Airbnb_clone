import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/registerPage'
import userContextProvider from './userContext'

axios.defaults.baseURL='http://localhost:4000';
axios.defaults.withCredentials=true;

function App() {


  return (
    
    <userContextProvider>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<IndexPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/register' element={<RegisterPage/>}/>
      </Route>
    </Routes>
    </userContextProvider>
  )
}

export default App
