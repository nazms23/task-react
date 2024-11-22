import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function TaskOge({taskAtt,afonks}) {
  /*
    Parametreler
    ? taskAtt -> task bilgileri {id,title,description,createdAt}
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
        if(res == 201)
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
    <div className='taskdisdiv'>
        <div style={{flex:1, marginLeft:10}}>
            <p>{taskAtt.id}</p>
        </div>
        <div style={{flex:3, marginLeft:10}}>
            {
                editMode ? <input onChange={(v)=>{setEditTitle(v.target.value)}} value={editTitle}/> : <p>{title}</p>
            }
        </div>
        <div style={{flex:2, marginLeft:10}}>
            {
                editMode ? <input onChange={(v)=>{setEditDescription(v.target.value)}} value={editDescription}/> : <p>{description}</p>
            }
        </div>
        <div style={{flex:1, marginLeft:10}}>
            <p>{taskAtt.createdAt}</p>
        </div>
        {
          isAuth &&
          <div style={{flex:1, marginLeft:10}}>
            <button onClick={fonks.sil}>
                Sil
            </button>
            <button onClick={fonks.setEditModFonk}>
                Düzenle
            </button>
            {editMode && 
            <button onClick={fonks.duzenle}>
                Kaydet
            </button>}
          </div>
        }
    </div>
  )
}

export default TaskOge