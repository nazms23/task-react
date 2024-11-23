import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { NotificationContainer,NotificationManager } from 'react-notifications'
import axios from 'axios'

import '../css/Login.css'
import 'react-notifications/lib/notifications.css';

function Register() {
  //? Redux ----
  const {url} = useSelector(s=>s.api)
  //? ----------

  //? Router ----
  const navigate = useNavigate()
  //? -----------

  //? Değişkenler ----
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [tpassword, setTpassword] = useState("")
  const [username, setUsername] = useState("")
  //? ----------------



  //? Kayıt olma fonksiyonu ----
  const kayitol = async () =>{
    //Password ile tekrar password aynıysa
    if(password == tpassword)
    {
      //Api isteği
      await axios.post(`${url}User/register`,{userName:username,email:email,password:password}).then((result) => {
        console.log(result)
        if(result.status == 201)
        {
          //! Kayıt başarılıysa login sayfasına yönlendirme
          navigate('/login?q=1');
        } 
        }).catch((err) => {
          //! Hata mesajları
          //? data eğer array ise, datanın içindeki bilgilerin description ve codunu hata olarak yazdır.
          if(Array.isArray(err.response.data))
          {
            err.response.data.forEach((e)=>{
              NotificationManager.error(e.description,e.code,2000)

            })
          }
          else
          {
            //? datanın içinde errors varsa errorsun içindeki hata içeriğini yazdır
            if(err.response.data.errors)
            {
              Object.keys(err.response.data.errors).forEach((e)=>{
                NotificationManager.error(err.response.data.errors[e][0],"Error",2000)
  
              })
            }
            else
            {
              //? datanın içinde errors yoksa datanın içindeki hata içeriğini yazdır
              Object.keys(err.response.data).forEach((e)=>{
                NotificationManager.error(err.response.data[e],"Error",2000)
              })
            }
          }
        });
    }
    else
    {
      NotificationManager.error("The passwords don't match.",'Password',2000)
    }
  }
  //? --------------------------

  useEffect(()=>{
    //* Title değiştirir
    document.title = "Sign Up"
  },[])

  return (
    <div className='loginendisdiv'>
      <div className='logindisdiv'>
        <div className='formdisdiv'>
        <div className='formicdiv'>
            <p className='formtext'>Username </p>
            <input className='forminput' type='email' value={username} onChange={v=>setUsername(v.target.value)}/>
          </div>
          <div className='formicdiv'>
            <p className='formtext'>Email </p>
            <input className='forminput' type='email' value={email} onChange={v=>setEmail(v.target.value)}/>
          </div>
          <div className='formicdiv'>
            <p className='formtext'>Password </p>
            <input className='forminput' type='password' value={password} onChange={v=>setPassword(v.target.value)}/>
          </div>
          <div className='formicdiv'>
            <p className='formtext'>Confirm Password </p>
            <input className='forminput' type='password' value={tpassword} onChange={v=>setTpassword(v.target.value)}/>
          </div>
          <div className='formicdiv'>
            <button className='formbutton' onClick={kayitol} >Sign Up</button>
          </div>
        </div>
      </div>
      <NotificationContainer/>
    </div>
  )
}

export default Register