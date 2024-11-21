import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/Header.css'
import { useSelector,useDispatch } from 'react-redux'
import { setIsAuth, setToken, setUser } from '../redux/authSlice'
import { useCookies } from 'react-cookie'



function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookie,setCookie,removeCookie] = useCookies()
  const {isAuth,user} = useSelector(s=>s.auth)

  const logout = ()=>{
    dispatch(setIsAuth(false))
    dispatch(setToken(""))
    dispatch(setUser({}))
    removeCookie('authCookie')
    removeCookie('userCookie')
    removeCookie('tokenCookie')
  }


  return (
    <div className='disdiv'>
        <div className='icdiv' style={{justifyItems:'start'}}>
            <Link to={"/"}  className='headLink'>Anasayfa</Link>
        </div>
        {
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
        
        
    </div>
  )
}

export default Header