import React, { useEffect, useState } from 'react'
import TableHead from '../components/Table/TableHead'
import TableCont from '../components/Table/TableCont'
import TableFoot from '../components/Table/TableFoot'
import '../css/Anasayfa.css'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setTasks,setIds, setMaxsayfa } from '../redux/taskSlice'
import { setSayfa } from '../redux/filterSlice'
import { NotificationContainer,NotificationManager } from 'react-notifications'
import 'react-notifications/lib/notifications.css';
import { useSearchParams } from 'react-router-dom'

function Ana() {
  //? Redux ----
  const dispatch = useDispatch()
  const {url,token} = useSelector(s=>s.auth)
  const {maxsayfa} = useSelector(s=>s.task)
  //? ----------

  //? Router ----
  const [searchParams, setSearchParams] = useSearchParams();
  //? -----------
  
    
  //! Tüm Fonksiyonlar
  const fonks = {
    //Tasksların hepsinin reduxa kaydedilmesini sağlar
    vericek: async ()=>{
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
            dispatch(setMaxsayfa(r.data.length/5))
          }
          else
          {
            dispatch(setMaxsayfa(Math.ceil(r.data.length/5)))
          }
        }
      }).catch(()=>{
        NotificationManager.error('Bir Hata Oluştu','Hata',2000)
      })
    },
    //Yeni task ekler
    ekle: async(title,description)=>{
      //Title'ın boş olup olmadığını kontrol eder
      if(title.trim() == "")
      {
          return NotificationManager.error('Title boş bırakılamaz','Hata',2000)
      }
      //Api isteği
      axios.post(`${url}Tasks`,{title,description},{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }).then(async(r)=>{
        if(r.status == 201)
        {
          NotificationManager.success('Başarıyla Eklendi','Başarı',2000)
          //Tablo verilerini yeniler
          await fonks.vericek()
          //! Yeni eklenen task en sonda olduğundan, kullanıcı eklediğini görebilsin diye sayfayı en son sayfaya getirir
          dispatch(setSayfa(maxsayfa))
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
    //Task düzenler
    duzenle: async(id,title,description)=>{
      //TaskOgesinde düzenle fonksiyonuna gelen responseyi yollaması için değişken
      const res = 1
      //Title'ın boş olup olmadığını kontrol eder
      if(title.trim() == "")
      {
        return NotificationManager.error('Title boş bırakılamaz','Hata',2000)
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
          NotificationManager.success('Başarıyla düzenlendi','Başarı',2000)
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
          NotificationManager.success('Başarıyla silindi','Başarı',2000)
          //Tablo verilerini yeniler
          fonks.vericek()
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

  //Sayfa ilk açıldığında tablonun tasklar gelmeden önce yüklenmesini engeller
  const [isConnect, setIsConnect] = useState(false)

  useEffect(()=>{
    //! Arama parametrelerinde "q" varsa (Giriş yaptan yönlendirme) başarıyla giriş yapıldı bildirimi ve parametreleri sıfırlama
    if(searchParams.get('q'))
    {
      //Bildirim
      NotificationManager.success('Başarıyla giriş yapıldı','Başarı',2000)

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
            <hr style={{width:'100%'}}/>
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