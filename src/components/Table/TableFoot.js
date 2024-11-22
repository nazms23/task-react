import React, { useState } from 'react'
import '../../css/Table.css'
import { useSelector,useDispatch } from 'react-redux'
import { setSayfa } from '../../redux/filterSlice'

function TableFoot({eklefonk}) {
  //? Redux ----
  const dispatch = useDispatch()
  const {isAuth} = useSelector(s=>s.auth)
  const {sayfa} = useSelector(s=>s.filter)
  const {maxsayfa} = useSelector(s=>s.task)
  //? ----------

  //? Değişkenler ----
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  //? ----------------

  
  
  //Fonksiyonlar
  const fonks={
    ekle: async()=>
    {
      //Ekleye basıldığında title ve descriptionu sıfırlar
      await eklefonk(title,description);
      setTitle("")
      setDescription("")
    },
    ileri: ()=>{
      sayfa < maxsayfa && dispatch(setSayfa(sayfa+1))
      
    },
    geri:()=>{
      sayfa != 1 && dispatch(setSayfa(sayfa-1))
    }

  }


  

  return (
    <div className='tfootdisdiv'>
      <div className='sayfadisdiv'>
        <button onClick={fonks.geri} disabled={sayfa == 1? true:false} className='sayfaItem'>
          {"<"}
        </button>
        <p className='sayfaItem'>{sayfa}</p>
        <button onClick={fonks.ileri} disabled={sayfa < maxsayfa? false:true} style={{display:'block'}} className='sayfaItem'>
          {">"}
        </button>
      </div>
      {
        isAuth && 
        <div className='ekledisdiv'>
        <div className='tfooticdiv' style={{flex:2}}>
          <h3>Yeni Task Ekle</h3>
        </div>
        <div className='tfooticdiv'  style={{flex:1}}>
          <h3>Title</h3>
          <input onChange={(v)=>{setTitle(v.target.value)}} value={title}/>
        </div>
        <div className='tfooticdiv'  style={{flex:1}}>
          <h3>Description</h3>
          <input onChange={(v)=>{setDescription(v.target.value)}} value={description} />
        </div>
        <div className='tfooticdiv'  style={{flex:1}}>
          <button onClick={fonks.ekle}>Ekle</button>
        </div>
      </div>
      }
      
      

    </div>
  )
}

export default TableFoot