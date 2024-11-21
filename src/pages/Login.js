import React, { useState } from 'react'
import '../css/Login.css'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setIsAuth,setToken,setUser } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'


function Login() {
  const {url} = useSelector(s=>s.auth)

  const [cookie,setCookie] = useCookies()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const girisyap = async ()=>{
    await axios.post(`${url}User/Login`,{email:email,password:password}).then((result) => {
      if(result.status == 200)
      {
        let d = new Date()
        d.setTime(d.getTime()+(1*60*60*1000))

        dispatch(setIsAuth(true))
        dispatch(setUser(result.data.username))
        dispatch(setToken(result.data.token))
        setCookie('authCookie',true,{expires:d})
        setCookie('userCookie',result.data.username,{expires:d})
        setCookie('tokenCookie',result.data.token,{expires:d})
        navigate('/');
      }
      
    }).catch((err) => {
      console.log(err)
    });
  }


  return (
    <div className='loginendisdiv'>
      <div className='logindisdiv'>
        <div className='formdisdiv'>
          <div className='formicdiv'>
            <p style={{flex:2}}>Email: </p>
            <input style={{flex:1}} type='email' value={email} onChange={v=>setEmail(v.target.value)}/>
          </div>
          <div className='formicdiv'>
            <p style={{flex:2}}>Password: </p>
            <input style={{flex:1}} type='password' value={password} onChange={v=>setPassword(v.target.value)}/>
          </div>
          <div className='formicdiv'>
            <button onClick={girisyap}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login