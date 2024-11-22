import React, { useEffect, useState } from 'react'
import TableHead from '../components/Table/TableHead'
import TableCont from '../components/Table/TableCont'
import TableFoot from '../components/Table/TableFoot'
import '../css/Anasayfa.css'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setTasks,setIds, setMaxsayfa } from '../redux/taskSlice'
import { setSearch,setSiralama,setSelectI,setSayfa } from '../redux/filterSlice'
import { NotificationContainer,NotificationManager } from 'react-notifications'
import 'react-notifications/lib/notifications.css';
import { useSearchParams } from 'react-router-dom'

function Ana() {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch()
    const {isAuth,url,token} = useSelector(s=>s.auth)
    const {tasks,maxsayfa} = useSelector(s=>s.task)
    const {search,siralama,selectId} = useSelector(s=>s.filter)

    const fonks = {
        vericek: async ()=>{
            await axios.get(`${url}Tasks`).then(r=>{
                if(r.status == 200)
                {
                    dispatch(setTasks(r.data))
                    setIsConnect(true)
                    dispatch(setIds(r.data.map(a=> a.id)))

                    if(r.data.length % 5 == 0)
                    {
                        dispatch(setMaxsayfa(r.data.length/5))
                    }
                    else
                    {
                        dispatch(setMaxsayfa(Math.ceil(r.data.length/5)))
                    }
                }
                else
                {
                  NotificationManager.error('Bir Hata Oluştu','Hata',2000)
                }
            }).catch(()=>{
              NotificationManager.error('Bir Hata Oluştu','Hata',2000)
            })
        },
        ekle: async(title,description)=>{ 
            if(title.trim() == "")
            {
                return NotificationManager.error('Title boş bırakılamaz','Hata',2000)
            }
            axios.post(`${url}Tasks`,{title,description},{
              headers:{
                Authorization:`Bearer ${token}`
              }
            }).then(async(r)=>{
                if(r.status == 201)
                {
                  NotificationManager.success('Başarıyla Eklendi','Başarı',2000)
                  dispatch(setSayfa(maxsayfa))
                  await fonks.vericek()
                }
                else if(r.status ==401)
                {
                  NotificationManager.error('Bu işlemi yapabilmeniz için giriş yapmış olmanız gerekmektedir.','Hata',2000)
                }
                else{
                  NotificationManager.error('Ekleme işleminde hata meydana geldi','Hata',2000)
                }
            }).catch((err) => {
              if(err.status == 401)
              {
                NotificationManager.error('Bu işlemi yapabilmeniz için giriş yapmış olmanız gerekmektedir.','Hata',2000)
              }else{
                NotificationManager.error('Ekleme işleminde hata meydana geldi','Hata',2000)
              }
            });
        },
        duzenle: async(id,title,description)=>{
            await axios.put(`${url}Tasks/${id}`,{id,title,description},{
                headers:{
                  Authorization:`Bearer ${token}`
                }
              }).then((r) => {
                if(r.status == 204)
                {
                  NotificationManager.success('Başarıyla düzenlendi','Başarı',2000)
                }
                else if(r.status ==404)
                {
                  NotificationManager.error('Id ile eşleşen task bulunamadı.','Hata',2000)
                }
                else if(r.status ==401)
                {
                  NotificationManager.error('Bu işlemi yapabilmeniz için giriş yapmış olmanız gerekmektedir.','Hata',2000)
                }
                else{
                  NotificationManager.error('Düzenleme işleminde hata meydana geldi','Hata',2000)
                }
              }).catch((err) => {
                if(err.status == 401)
                {
                  NotificationManager.error('Bu işlemi yapabilmeniz için giriş yapmış olmanız gerekmektedir.','Hata',2000)
                }
                else if(err.status ==404)
                {
                  NotificationManager.error('Id ile eşleşen task bulunamadı.','Hata',2000)
                }
                else
                {
                  NotificationManager.error('Düzenleme işleminde hata meydana geldi','Hata',2000)
                }
              });
        },
        sil:async(id)=>{
            await axios.delete(`${url}Tasks/${id}`,{
                headers:{
                  Authorization:`Bearer ${token}`
                }
              }).then(r=>{
                if(r.status == 204)
                {
                  NotificationManager.success('Başarıyla silindi','Başarı',2000)
                  fonks.vericek()
                }
                else if(r.status ==404)
                {
                  NotificationManager.error('Id ile eşleşen task bulunamadı.','Hata',2000)
                }
                else if(r.status ==401)
                {
                  NotificationManager.error('Bu işlemi yapabilmeniz için giriş yapmış olmanız gerekmektedir.','Hata',2000)
                }
                else{
                  NotificationManager.error('Silme işleminde hata meydana geldi','Hata',2000)
                }
                
                
              }).catch((err) => {
                if(err.status == 401)
                {
                  NotificationManager.error('Bu işlemi yapabilmeniz için giriş yapmış olmanız gerekmektedir.','Hata',2000)
                }
                else if(err.status ==404)
                {
                  NotificationManager.error('Id ile eşleşen task bulunamadı.','Hata',2000)
                }
                else
                {
                  NotificationManager.error('Silme işleminde hata meydana geldi','Hata',2000)
                }
              });
            
        }
    }



    const [isConnect, setIsConnect] = useState(false)
    useEffect(()=>{
      if(searchParams.get('q'))
        {
          NotificationManager.success('Başarıyla giriş yapıldı','Başarı',2000)
          setSearchParams("")
        }
        fonks.vericek();
    },[])

  return (
    <div className='tabledisdiv'>
        <div className='tablediv'>
            <TableHead />
            <hr style={{width:'100%'}}/>
            {isConnect && <TableCont taskfonks={{duzenle:fonks.duzenle,sil:fonks.sil}} />}
            
            <TableFoot eklefonk={fonks.ekle} />
        </div>
    
        
    <NotificationContainer/>
    </div>
  )
}

export default Ana