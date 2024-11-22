import React from 'react'
import '../../css/Table.css'
import TaskOge from './TaskOge'
import { useSelector,useDispatch} from 'react-redux'
import { setMaxsayfa } from '../../redux/taskSlice'

function TableCont({taskfonks}) {
  //? Redux ----
  const dispatch = useDispatch()
  const {isAuth} = useSelector(s=>s.auth)
  const {tasks,maxsayfa} = useSelector(s=>s.task)
  const {search,siralama,selectId,sayfa} = useSelector(s=>s.filter)
  //? ----------


  //Gelen tasklarla ilgili filtreleme vs yapan fonksiyon
  const taskFonk = (dizi)=>{
    let filtrelenmisTasks = dizi
    //siralama değişkenine göre baştan sona veya sondan başa sıralar
    .sort((a,b)=>{return siralama == 1 ? a.id-b.id : b.id-a.id})
    //Id, Title ve Descriptiona göre filtreleme yapar
    .filter(t=>{
      //Title ve descriptiona, arama inputuna yazılana göre filtreleme
      if(t.description.toLowerCase().includes(search) || t.title.toLowerCase().includes(search))
      {
        //Seçili Id varsa seçili Id ye göre filtreleme
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

    let renkclass = false
    //Filtrelenen tasklara göre sayfalama işlemleri ve yazdırılma
    let sayfayaYazilanTask = filtrelenmisTasks.slice(((sayfa-1)*4)+sayfa-1,(sayfa*4)+sayfa).map(k=>{
      renkclass = !renkclass

      //! Gelen tarih bilgisini düzenler
      let d = new Date(k.createdAt)
      let dstring = `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
      console.log(d)
      return <TaskOge renkicinclass={`renk${renkclass ? "1":"2"}`} taskAtt={k} createdDate={dstring} afonks={taskfonks} key={k.id}/> 
    })

    //Filtrelenen tasklara göre maksimum sayfa belirleme
    if(filtrelenmisTasks.length % 5 == 0)
    {
        dispatch(setMaxsayfa(filtrelenmisTasks.length/5))
    }
    else
    {
      dispatch(setMaxsayfa(Math.ceil(filtrelenmisTasks.length/5)))
    }

    
    return sayfayaYazilanTask

  }

  

  return (
    <div className='tcontdisdiv'>
      {
        taskFonk([...tasks])
      }
    </div>
    
    
  )
}

export default TableCont