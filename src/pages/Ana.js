import React, { useEffect, useState } from 'react'
import TableHead from '../components/Table/TableHead'
import TableCont from '../components/Table/TableCont'
import TableFoot from '../components/Table/TableFoot'
import '../css/Anasayfa.css'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setTasks,setIds, setMaxsayfa } from '../redux/taskSlice'
import { setSearch,setSiralama,setSelectId } from '../redux/filterSlice'



function Ana() {
    const dispatch = useDispatch()
    const {isAuth,url,token} = useSelector(s=>s.auth)
    const {tasks} = useSelector(s=>s.task)
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
            })
        },
        ekle: async(title,description)=>{ 
            if(title.trim() == "")
            {
                console.log("hata")
                return "hata"
            }
            axios.post(`${url}Tasks`,{title,description},{
              headers:{
                Authorization:`Bearer ${token}`
              }
            }).then(async(r)=>{
                console.log(r)
                if(r.status == 201)
                {
                    await fonks.vericek()
                }
            })
        },
        duzenle: async(id,title,description)=>{
            await axios.put(`${url}Tasks/${id}`,{id,title,description},{
                headers:{
                  Authorization:`Bearer ${token}`
                }
              })
        },
        sil:async(id)=>{
            await axios.delete(`${url}Tasks/${id}`,{
                headers:{
                  Authorization:`Bearer ${token}`
                }
              }).then(r=>{
                fonks.vericek()
              })
            
        }
    }



    const [isConnect, setIsConnect] = useState(false)
    useEffect(()=>{
        fonks.vericek();
    },[])

  return (
    <div className='tabledisdiv'>
        <div className='tablediv'>
            <TableHead/>
            <hr style={{width:'100%'}}/>
            {isConnect && <TableCont taskfonks={{duzenle:fonks.duzenle,sil:fonks.sil}} />}
            
            <TableFoot eklefonk={fonks.ekle} />
        </div>
    
        
    
    </div>
  )
}

export default Ana