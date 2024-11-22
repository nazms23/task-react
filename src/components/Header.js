import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Header.css'
import { useSelector,useDispatch } from 'react-redux'
import { setIsAuth, setToken, setUser } from '../redux/authSlice'
import { useCookies } from 'react-cookie'
import { NotificationContainer,NotificationManager } from 'react-notifications'
import 'react-notifications/lib/notifications.css';


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
    NotificationManager.success('Başarıyla çıkış yapıldı','Başarı',2000)
  }


  return (
    <div className='disdiv'>
        <div className='icdiv' style={{justifyItems:'start'}}>
            <Link to={"/"}  className='headLink'>Anasayfa</Link>
        </div>
        {
          //Giriş yapılıysa veya değilse gösterilcek butonlar
          !isAuth ? 
          <div className='icdiv' style={{justifyContent:'space-evenly'}}>
            <Link to={"/login"} className='headLink'>Giriş Yap</Link>
            <Link to={"/register"} className='headLink'>Kayıt Ol</Link>
          </div> 
          :
          <div className='icdiv' style={{justifyContent:'space-evenly'}}>
            <p>{user}</p>
            <button onClick={logout} className='headLink'>Çıkış Yap</button>
          </div>
        }
        
        <NotificationContainer/>
    </div>
  )
}

export default Header