import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { NotificationContainer,NotificationManager } from 'react-notifications'
import axios from 'axios'

import { setSayfa } from '../redux/filterSlice'
import { setTasks,setIds, setMaxsayfa } from '../redux/taskSlice'

import TableHead from '../components/Table/TableHead'
import TableCont from '../components/Table/TableCont'
import TableFoot from '../components/Table/TableFoot'


import '../css/Anasayfa.css'
import 'react-notifications/lib/notifications.css';

function Ana() {
  //? Redux ----
  const dispatch = useDispatch()
  const {token} = useSelector(s=>s.auth)
  const {url} = useSelector(s=>s.api)
  const {maxsayfa} = useSelector(s=>s.task)
  const {siralama} = useSelector(s=>s.filter)
  //? ----------

  //? Router ----
  const [searchParams, setSearchParams] = useSearchParams();
  //? -----------
  
    
  //! Tüm Fonksiyonlar
  const fonks = {
    //Tasksların hepsinin reduxa kaydedilmesini sağlar
    vericek: async (islem)=>{
      //Api isteği
      await axios.get(`${url}Tasks`).then(r=>{
        if(r.status == 200)
        {
          //Taskları reduxa kaydeder
          dispatch(setTasks(r.data))
          //Bağlanmayı kontrol eden değişkeni true yapar
          setIsConnect(true)
          //Task Id'lerini reduxa kaydeder
          dispatch(setIds(r.data.map(a=> a.id)))

          //Verilerin uzunluğuna göre maksimum sayfayı belirler
          if(r.data.length % 5 == 0)
          {
            //! Yeni eklenen task en sonda olduğundan, kullanıcı eklediğini görebilsin diye sayfayı en son sayfaya getirir
            //! Silinen task sayfanın ilk taskıysa bi önceki sayfaya döndürür
            //? Eğer sıralama oldestse
            if((islem == "ekle" || islem == "sil") && siralama == 1)
            {
              dispatch(setSayfa(r.data.length/5))
            }
            dispatch(setMaxsayfa(r.data.length/5))
          }
          else
          {
            //! Yeni eklenen task en sonda olduğundan, kullanıcı eklediğini görebilsin diye sayfayı en son sayfaya getirir
            //! Silinen task sayfanın ilk taskıysa bi önceki sayfaya döndürür
            //? Eğer sıralama oldestse
            if((islem == "ekle" || islem == "sil") && siralama == 1)
            {
              dispatch(setSayfa(Math.ceil(r.data.length/5)))
            }
            dispatch(setMaxsayfa(Math.ceil(r.data.length/5)))
          }
        }
      }).catch(()=>{
        NotificationManager.error('Something went wrong.','Error',2000)
      })
    },
    //Yeni task ekler
    ekle: async(title,description)=>{
      //Title'ın boş olup olmadığını kontrol eder
      if(title.trim() == "")
      {
          return NotificationManager.error('Title cannot be empty.','Error',2000)
      }
      //Api isteği
      axios.post(`${url}Tasks`,{title,description},{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }).then(async(r)=>{
        if(r.status == 201)
        {
          NotificationManager.success('Successfully Added.','Success',2000)
          //Tablo verilerini yeniler
          await fonks.vericek("ekle")
        }

      }).catch((err) => {
        if(err.status == 401)
        {
          NotificationManager.error('You must be logged in to do this.','Error',2000)
        }else{
          NotificationManager.error('Something went wrong.','Error',2000)
        }
      });
    },
    //Task düzenler
    duzenle: async(id,title,description)=>{
      //TaskOgesinde düzenle fonksiyonuna gelen responseyi yollaması için değişken
      let res = 1
      //Title'ın boş olup olmadığını kontrol eder
      if(title.trim() == "")
      {
        return NotificationManager.error('Title cannot be empty.','Error',2000)
      }
      //Api isteği
      await axios.put(`${url}Tasks/${id}`,{id,title,description},{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }).then((r) => {
        if(r.status == 204)
        {
          res = r.status;
          NotificationManager.success('Successfully Edited','Success',2000)
        }
      }).catch((err) => {
        if(err.status == 401)
        {
          NotificationManager.error('You must be logged in to do this.','Error',2000)
        }
        else if(err.status ==404)
        {
          NotificationManager.error('Task matching Id was not found.','Error',2000)
        }
        else
        {
          NotificationManager.error('Something went wrong.','Error',2000)
        }
      });
      return res
    },
    //Task siler
    sil:async(id)=>{
      //Api isteği
      await axios.delete(`${url}Tasks/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }).then(r=>{
        if(r.status == 204)
        {
          NotificationManager.success('Successfully deleted','Success',2000)
          //Tablo verilerini yeniler
          fonks.vericek("sil")
        }
      }).catch((err) => {
        if(err.status == 401)
        {
          NotificationManager.error('You must be logged in to do this.','Error',2000)
        }
        else if(err.status ==404)
        {
          NotificationManager.error('Task matching Id was not found.','Error',2000)
        }
        else
        {
          NotificationManager.error('Something went wrong.','Error',2000)
        }
      });
      
    }
  }

  //Sayfa ilk açıldığında tablonun tasklar gelmeden önce yüklenmesini engeller
  const [isConnect, setIsConnect] = useState(false)

  useEffect(()=>{
    //* Title değiştirir
    document.title = "Home"


    //! Arama parametrelerinde "q" varsa (Giriş yaptan yönlendirme) başarıyla giriş yapıldı bildirimi ve parametreleri sıfırlama
    if(searchParams.get('q'))
    {
      //Bildirim
      NotificationManager.success('Successfully logged in','Success',2000)

      //! Sayfa yenileme vs durumunda bildirimin tekrar gelmemesi için parametreleri sıfırlar
      setSearchParams("")
    }
    //Tablo verilerini yükler
    fonks.vericek();
  },[])

  return (
    <div className='tabledisdiv'>
        <div className='tablediv'>
            <TableHead />
            {
            //isConnect true ise TableCont u yükler
            }
            {isConnect && <TableCont taskfonks={{duzenle:fonks.duzenle,sil:fonks.sil}} /> 
            //! taskfonks->Anasayfadan tasklara fonksiyon taşımak için
            }
            
            <TableFoot eklefonk={fonks.ekle} />
        </div>
    
        
    <NotificationContainer/>
    </div>
  )
}

export default Ana