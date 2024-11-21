import { Route,Routes } from "react-router-dom";
import Ana from "./pages/Ana";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error404 from "./pages/Error404";
import Header from "./components/Header";
import { useCookies } from 'react-cookie'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { setIsAuth, setToken, setUser } from "./redux/authSlice";


function App() {
  const dispatch = useDispatch()
  const [cookie,SetCookie] = useCookies()

  useEffect(()=>{
    if(cookie.authCookie)
    {
      dispatch(setIsAuth(cookie.authCookie))
      dispatch(setUser(cookie.userCookie))
      dispatch(setToken(cookie.tokenCookie))

    }
  },[])

  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Ana/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="*" element={<Error404/>}/>
      </Routes>
    </div>
  );
}

export default App;
