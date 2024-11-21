import React from 'react'
import '../../css/Table.css'
import { useSelector, useDispatch } from 'react-redux'
import { setSearch,setSiralama,setSelectId } from '../../redux/filterSlice'

function TableHead({}) {
  const dispatch = useDispatch()

  const {isAuth} = useSelector(s=>s.auth)
  const {ids} = useSelector(s=>s.task)

  return (
    <div className='theaddisdiv'>
      <div className='filtrelerdiv'>
        <div className='filtrediv' style={{flex:1}}>
            <h3 style={{marginRight:10}}>Id: </h3>
            <select style={{fontSize:17}}  onChange={(v)=>{dispatch(setSelectId(v.target.value))}}>
              <option value={0}>Seç</option>
              {
                
                ids.map((i)=>{
                  return <option value={i} key={i}>{i}</option>
                })
              }
            </select>
        </div>
        <div className='filtrediv' style={{flex:5}}>
            <h3 style={{marginRight:10}}>Ara: </h3>
            <input className='arainp' onChange={(v)=>{dispatch(setSearch(v.target.value))}}/>
        </div>
        <div className="filtrediv" style={{flex:2}}>
            <h3 style={{marginRight:10}}>Sıralama</h3>
            <select style={{fontSize:17}} onChange={(v)=>{dispatch(setSiralama(v.target.value))}}>
                <option value={1}>Baştan Sona</option>
                <option value={2}>Sondan Başa</option>
            </select>
        </div>
      </div>
      <hr/>
      <div className='tablobolumlerdiv'>
        <div style={{flex:1, marginLeft:10}}>
            <h3>
              Id
            </h3>
        </div>
        <div style={{flex:3, marginLeft:10}}>
            <h3>
              Title
            </h3>
        </div>
        <div style={{flex:2, marginLeft:10}}>
            <h3>
              Description
            </h3>
        </div>
        <div style={{flex:1, marginLeft:10}}>
            <h3>
              Created At
            </h3>
        </div>
        {
          isAuth &&
          <div style={{flex:1, marginLeft:10}}>
            <h3>
              Buttons
            </h3>
          </div>
        }
      </div>
    </div>
  )
}

export default TableHead