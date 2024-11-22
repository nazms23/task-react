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
      <div className='tfootustkisimdiv'>
        <div className='tfootustbolmediv'>
          {isAuth && <h3 className='tfoottaskyazi'>Add New Task</h3>}
        </div>
        <div className='sayfadisdiv tfootustbolmediv'>
          <button onClick={fonks.geri} disabled={sayfa == 1? true:false} className='sayfaItem sayfabutton'>
            {"<"}
          </button>
          <p className='sayfaItem'>{sayfa}</p>
          <button onClick={fonks.ileri} disabled={sayfa < maxsayfa? false:true} style={{display:'block'}} className='sayfaItem sayfabutton'>
            {">"}
          </button>
        </div>
        <div className='tfootustbolmediv'>

        </div>
      </div>
      
      {
        isAuth && 
        <div className='ekledisdiv'>
        <div className='tfooticdiv'  style={{flex:2}}>
          <h3 className='tfoottaskyazi'>Title</h3>
          <input className='tfootinput' onChange={(v)=>{setTitle(v.target.value)}} value={title}/>
        </div>
        <div className='tfooticdiv'  style={{flex:3}}>
          <h3 className='tfoottaskyazi'>Description</h3>
          <input className='tfootinput' onChange={(v)=>{setDescription(v.target.value)}} value={description} />
        </div>
        <div className='tfooticdiv'  style={{flex:0.5}}>
          <button className='tfooteklebuton' onClick={fonks.ekle}>Add</button>
        </div>
        <div className='tfooticdiv' style={{flex:4}}>

        </div>

      </div>
      }
      
      

    </div>
  )
}

export default TableFoot