import React, { useState } from 'react'
import '../css/Login.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { NotificationContainer,NotificationManager } from 'react-notifications'
import 'react-notifications/lib/notifications.css';

function Register() {
  //? Redux ----
  const {url} = useSelector(s=>s.auth)
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
                NotificationManager.error(err.response.data.errors[e][0],"Hata",2000)
  
              })
            }
            else
            {
              //? datanın içinde errors yoksa datanın içindeki hata içeriğini yazdır
              Object.keys(err.response.data).forEach((e)=>{
                NotificationManager.error(err.response.data[e],"Hata",2000)
              })
            }
          }
        });
    }
    else
    {
      NotificationManager.error("Şifreler birbiriyle uyuşmuyor.",'Şifre',2000)
    }
  }
  //? --------------------------

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
      <NotificationContainer/>
    </div>
  )
}

export default Register