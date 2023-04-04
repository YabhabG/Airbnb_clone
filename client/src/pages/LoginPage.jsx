import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate, redirect } from "react-router-dom";
import { userContext } from "../userContext";
import RegisterPage from "./registerPage";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn]=useState(false);
    const{setUser}=useContext(userContext);
    

    const loginHandler = async (e) => {
        

        e.preventDefault();
        try {
            
          const userInfo = await axios.post('/login', { email, password });

          document.cookie = `token=${userInfo.data}; path=/;`;

          if(setUser)
          {
            setUser(userInfo)
          }
          alert('Login Succesful');
          setIsLoggedIn(true);
        } catch (err) {
          console.log(err);
          alert('Login Failed.');
        }
      };

    if(isLoggedIn)
        {
            return <Navigate to={'/'}/>
        }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-center text-4xl mb-2">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={loginHandler}>
                    <input
                        type={'email'}
                        placeholder='your email'
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <input
                        type={'password'}
                        placeholder='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500" >Don't have an account? <Link className="underline text-black" to={'/register'}>Register Here</Link></div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;