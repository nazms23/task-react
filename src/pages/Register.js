import React, { useState } from 'react'
import '../css/Login.css'
import { useSelector, useDispatch } from 'react-redux'
import { setIsAuth,setToken,setUser } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {
  const {url} = useSelector(s=>s.auth)

  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [tpassword, setTpassword] = useState("")
  const [username, setUsername] = useState("")


  const kayitol = async () =>{
    console.log(username)
    console.log(email)
    console.log(password)
    console.log(tpassword)

    if(password == tpassword)
    {
      await axios.post(`${url}User/register`,{userName:username,email:email,password:password}).then((result) => {
        console.log(result)
        if(result.status == 201)
          {
            navigate('/login');
          }
          
        }).catch((err) => {
          console.log(err)
        });
    }
  }

  return (
    <div className='loginendisdiv'>
      <div className='logindisdiv'>
        <div className='formdisdiv'>
        <div className='formicdiv'>
            <p style={{flex:2}}>Username: </p>
            <input style={{flex:1}} type='email' value={username} onChange={v=>setUsername(v.target.value)}/>
          </div>
          <div className='formicdiv'>
            <p style={{flex:2}}>Email: </p>
            <input style={{flex:1}} type='email' value={email} onChange={v=>setEmail(v.target.value)}/>
          </div>
          <div className='formicdiv'>
            <p style={{flex:2}}>Password: </p>
            <input style={{flex:1}} type='password' value={password} onChange={v=>setPassword(v.target.value)}/>
          </div>
          <div className='formicdiv'>
            <p style={{flex:2}}>Tekrar Password: </p>
            <input style={{flex:1}} type='password' value={tpassword} onChange={v=>setTpassword(v.target.value)}/>
          </div>
          <div className='formicdiv'>
            <button onClick={kayitol} >Register</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register