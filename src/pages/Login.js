import React, { useEffect, useState } from 'react'
import '../css/Login.css'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setIsAuth,setToken,setUser } from '../redux/authSlice'
import { useNavigate,useSearchParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { NotificationContainer,NotificationManager } from 'react-notifications'
import 'react-notifications/lib/notifications.css';

function Login() {
  const {url} = useSelector(s=>s.auth)


  const [searchParams, setSearchParams] = useSearchParams();
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
        navigate('/?q=1');
      }
      else{
        NotificationManager.error(result.response.data.description,'Hata',2000)
      }
        
      }).catch((err) => {
        console.log(err)
        if(err.status == 401)
        {
          NotificationManager.error("Şifre Yanlış",'Şifre',2000)
        }
        else{
          if(Array.isArray(err.response.data))
          {
            err.response.data.forEach((e)=>{
              NotificationManager.error(e.description,e.code,2000)

            })
          }
          else
          {
            if(err.response.data.errors)
            {
              Object.keys(err.response.data.errors).forEach((e)=>{
                NotificationManager.error(err.response.data.errors[e][0],"Hata",2000)
  
              })
            }
            else
            {
              Object.keys(err.response.data).forEach((e)=>{
                NotificationManager.error(err.response.data[e],"Hata",2000)
              })
            }
          }
        }
        
      });
  }


  useEffect(()=>{
    if(searchParams.get('q'))
    {
      NotificationManager.success('Başarıyla kayıt olundu','Başarı',2000)
      setSearchParams("")
    }
  },[])


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
      <NotificationContainer/>
    </div>
  )
}

export default Login