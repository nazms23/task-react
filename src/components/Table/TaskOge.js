import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function TaskOge({taskAtt,afonks}) {
    const {isAuth} = useSelector(s=>s.auth)

    const fonks = {
        setEditModFonk: ()=>{
            setEditMode(!editMode)
        },

        duzenle: async ()=>{
            await afonks.duzenle(taskAtt.id,editTitle,editDescription)
            setTitle(editTitle)
            setDescription(editDescription)
            setEditMode(false)
        },
        sil: async()=>{
            await afonks.sil(taskAtt.id)
        }
    }

    const [title, setTitle] = useState(taskAtt.title)
    const [description, setDescription] = useState(taskAtt.description)
    const [editTitle, setEditTitle] = useState(taskAtt.title)
    const [editDescription, setEditDescription] = useState(taskAtt.description)


    const [editMode, setEditMode] = useState(false)

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