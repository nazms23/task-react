import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { NotificationContainer,NotificationManager } from 'react-notifications'
import { useCookies } from 'react-cookie'

import { setIsAuth, setToken, setUser } from '../redux/authSlice'

import 'react-notifications/lib/notifications.css';
import '../css/Header.css'

function Header() {
  //? Redux ----
  const dispatch = useDispatch();
  const {isAuth,user} = useSelector(s=>s.auth)
  //? ----------

  //? Cookie ----
  const [cookie,setCookie,removeCookie] = useCookies()
  //? -----------


  //!Çıkış yapma fonksiyonu
  const logout = ()=>{
    //Reduxdaki bilgileri siler
    dispatch(setIsAuth(false))
    dispatch(setToken(""))
    dispatch(setUser({}))
    //Cookieleri siler
    removeCookie('authCookie')
    removeCookie('userCookie')
    removeCookie('tokenCookie')
    NotificationManager.success('Successfully logged out','Success',2000)
  }


  return (
    <div className='disdiv'>
        <div className='icdiv' style={{justifyItems:'start'}}>
            <Link to={"/"}  className='headLink'>Home</Link>
        </div>
        {
          //Giriş yapılıysa veya değilse gösterilcek butonlar
          !isAuth ? 
          <div className='icdiv' style={{justifyContent:'space-evenly'}}>
            <Link to={"/sign-in"} className='headLink'>Sign in</Link>
            <Link to={"/sign-up"} className='headLink' style={{backgroundColor:'rgb(36, 133, 219)', color:'#fff', padding:5,borderRadius:6}}>Sign Up</Link>
          </div> 
          :
          <div className='icdiv' style={{justifyContent:'space-evenly'}}>
            <p className='headUserText'>{user}</p>
            <vr/>
            <button onClick={logout} className='headLink headButton'>Logout</button>
          </div>
        }
        
        <NotificationContainer/>
    </div>
  )
}

export default Header