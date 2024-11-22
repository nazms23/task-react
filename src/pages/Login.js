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
  //? Redux ----
  const {url} = useSelector(s=>s.auth)
  const dispatch = useDispatch()
  //? ----------

  //? Router ----
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  //? -----------

  //? Cookie ----
  const [cookie,setCookie] = useCookies()
  //? ----------

  //? Değişkenler ----
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  //? ----------------

  //? Giriş yapma fonksiyonu ----
  const girisyap = async ()=>{
    //Api isteği
    await axios.post(`${url}User/Login`,{email:email,password:password}).then((result) => 
    {
        if(result.status == 200)
        {
          //! Giriş başarılıysa gelen bilgileri cookieye kaydetme ve anasayfaya yönlendirme
          
          //Cookieler için 1 saatlik zaman
          let d = new Date()
          d.setTime(d.getTime()+(1*60*60*1000))

          //Reduxlara bilgileri kaydetme
          dispatch(setIsAuth(true))
          dispatch(setUser(result.data.username))
          dispatch(setToken(result.data.token))

          //Cookieye bilgileri kaydetme
          setCookie('authCookie',true,{expires:d})
          setCookie('userCookie',result.data.username,{expires:d})
          setCookie('tokenCookie',result.data.token,{expires:d})

          //Anasayfaya yönlendirme
          navigate('/?q=1');
        } 
    }).catch((err) => {
      //Şifre yanlışsa dönen kod
      if(err.status == 401)
      {
        NotificationManager.error("Incorrect password",'Password',2000)
      }
      else
      {
        //Farklı bir hata varsa
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
              NotificationManager.error(err.response.data.errors[e][0],"Error",2000)

            })
          }
          else
          {
            Object.keys(err.response.data).forEach((e)=>{
              NotificationManager.error(err.response.data[e],"Error",2000)
            })
          }
        }
      }
    });
  }
  //? ---------------------------



  useEffect(()=>{
    //! Arama parametrelerinde "q" varsa (kayıt oldan yönlendirme) başarıyla kayıt olundu bildirimi ve parametreleri sıfırlama
    if(searchParams.get('q'))
    {
      //Bildirim
      NotificationManager.success('Successfully Signed Up','Success',2000)

      //! Sayfa yenileme vs durumunda bildirimin tekrar gelmemesi için parametreleri sıfırlar
      setSearchParams("")
    }
  },[])


  return (
    <div className='loginendisdiv'>
      <div className='logindisdiv'>
        <div className='formdisdiv'>
          <div className='formicdiv'>
            <p className='formtext'>Email </p>
            <input className='forminput' type='email' value={email} onChange={v=>setEmail(v.target.value)}/>
          </div>
          <div className='formicdiv'>
            <p className='formtext'>Password </p>
            <input className='forminput' type='password' value={password} onChange={v=>setPassword(v.target.value)}/>
          </div>
          <div className='formicdiv'>
            <button className='formbutton' onClick={girisyap}>Sign In</button>
          </div>
        </div>
      </div>
      <NotificationContainer/>
    </div>
  )
}

export default Login