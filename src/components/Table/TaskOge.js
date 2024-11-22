import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function TaskOge({renkicinclass,taskAtt,createdDate,afonks}) {
  /*
    Parametreler
    ? renkicinclass -> Arkaplan renklerini değiştiren class
    ? taskAtt -> task bilgileri {id,title,description,createdAt}
    ? createdDate -> düzenlenmiş tarih bilgisi
    ? afonks  -> Anasayfadan gelen fonksiyonlar
  */
  //? Redux ----
  const {isAuth} = useSelector(s=>s.auth)
  //? ----------

  //? Değişkenler ----
  const [title, setTitle] = useState(taskAtt.title)
  const [description, setDescription] = useState(taskAtt.description)

  //! Edit olanlar sadece inputlarda kalır normal olanlar ise "p" taglarında kalır
  const [editTitle, setEditTitle] = useState(taskAtt.title)
  const [editDescription, setEditDescription] = useState(taskAtt.description)

  const [editMode, setEditMode] = useState(false)

  //? Uzun textlere tıklandığında boyutunu büyültmeye yarar
  const [uzunMode, setUzunMode] = useState(false)
  //? ----------------


  //Fonksiyonlar
  const fonks = {
    //Düzenle butonuna basınca edit modunu açar
    //? Edit modu textlerin yerine input koyarak düzenlemeye açık hale getirir
    setEditModFonk: ()=>{
        setEditMode(!editMode)
    },
    //Kaydet butonuna basınca çalışır
    duzenle: async ()=>{
        //Anasayfadan gelen fonksiyonu çalıştırır
        const res = await afonks.duzenle(taskAtt.id,editTitle,editDescription)
        //! Fonksiyondan dönen kod 201 ise değişkenleri edit versiyonları ile değiştirir
        if(res == 204)
        {
            setTitle(editTitle)
            setDescription(editDescription)
            setEditMode(false)
        }
    },
    sil: async()=>{
        await afonks.sil(taskAtt.id)
    }
}

    


    

  return (
    <div className={`taskdisdiv ${renkicinclass}`} onClick={()=>{setUzunMode(!uzunMode)}}>
        <div className='taskbolme' style={{flex:1}}>
            <p className='tasktext'>{taskAtt.id}</p>
        </div>
        <div className='taskbolme' style={{flex:3}}>
            {
                editMode ? <input className='taskinput' onChange={(v)=>{setEditTitle(v.target.value)}} value={editTitle}/> : <p className='tasktext taskkaydir'>{title.length > 31 ? uzunMode? title: title.slice(0,31)+"...":title}</p>
            }
        </div>
        <div className='taskbolme' style={{flex:2}}>
            {
                editMode ? <textarea className='taskinput'  onChange={(v)=>{setEditDescription(v.target.value)}} >{editDescription}</textarea>: <p className='tasktext taskkaydir'>{description.length > 31 ? uzunMode? description: description.slice(0,31)+"...":description }</p>
            }
        </div>
        <div className='taskbolme' style={{flex:1}} >
            <p className='tasktext'>{createdDate}</p>
        </div>
        {
          isAuth &&
          <div className='taskbolme' style={{flex:2, display:'flex', justifyContent:'flex-end',marginRight:10}}>
            {editMode && 
            <button className='taskbutton savebuton' style={{borderColor:"#95d387"}} onClick={fonks.duzenle}>
                Save
            </button>}
            <button className='taskbutton editbuton' style={{borderColor:"#ffdd00"}}  onClick={fonks.setEditModFonk}>
                Edit
            </button>
            <button className='taskbutton deletebuton' style={{borderColor:"rgb(252, 177, 177)"}}  onClick={fonks.sil}>
                Delete
            </button>
            
            
          </div>
        }
    </div>
  )
}

export default TaskOge