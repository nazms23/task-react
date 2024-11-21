import React, { useEffect, useState } from 'react'
import '../../css/Table.css'
import TaskOge from './TaskOge'
import { useSelector,useDispatch} from 'react-redux'
import { setMaxsayfa } from '../../redux/taskSlice'

function TableCont({taskfonks}) {
  const dispatch = useDispatch()
  const {isAuth} = useSelector(s=>s.auth)
  const {tasks,maxsayfa} = useSelector(s=>s.task)
  const {search,siralama,selectId,sayfa} = useSelector(s=>s.filter)

{/* <TaskOge taskAtt={t} afonks={taskfonks} key={t.id}/> */}

  const deneme = (dizi)=>{
    let ret = dizi.sort((a,b)=>{return siralama == 1 ? a.id-b.id : b.id-a.id}).filter(t=>{
      if(t.description.toLowerCase().includes(search) || t.title.toLowerCase().includes(search))
      {
        if(selectId != 0)
        {
          if(t.id == selectId)
          {
            return t
          }
        }
        else
        {
          return t
        }
      }
    })

    let retdoncek = ret.slice(((sayfa-1)*4)+sayfa-1,(sayfa*4)+sayfa).map(k=>{
      return <TaskOge taskAtt={k} afonks={taskfonks} key={k.id}/> 
    })
    if(ret.length % 5 == 0)
    {
        dispatch(setMaxsayfa(ret.length/5))
    }
    else
    {
      dispatch(setMaxsayfa(Math.ceil(ret.length/5)))
    }
    
    console.log("maxsayfa",maxsayfa)
    console.log(ret)
    return retdoncek

  }

  

  return (
    <div className='tcontdisdiv'>
      {
        deneme([...tasks])
      }
    </div>
    
    
  )
}

export default TableCont