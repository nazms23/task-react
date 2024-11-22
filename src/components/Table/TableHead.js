import React from 'react'
import '../../css/Table.css'
import { useSelector, useDispatch } from 'react-redux'
import { setSearch,setSiralama,setSelectId, setSayfa } from '../../redux/filterSlice'

function TableHead() {
  //? Redux ----
  const dispatch = useDispatch()
  const {isAuth} = useSelector(s=>s.auth)
  const {ids} = useSelector(s=>s.task)
  const {search,selectId,siralama} = useSelector(s=>s.filter)
  //? ----------


  
  return (
    <div className='theaddisdiv'>
      <div className='filtrelerdiv'>
        <div className='filtrediv' style={{flex:1}}>
            <h3 className='filtretext'>Id </h3>
            <select className='filtreselect'  onChange={(v)=>{
              //! Arama inputu boş değilse ve Id seçilmişse arama inputundaki veriyi sıfırlar
              //? Id seçilse dahi arama inputundaki yazıya göre de filtreleme yaptığı için
              dispatch(setSelectId(v.target.value))
              dispatch(setSearch(""))
              }}>
              <option value={0}>Select</option>
              {
                //Id'leri option olarak yazdırır
                ids.map((i)=>{
                  return <option className='filtreoption' selected={selectId == i && true} value={i} key={i}>{i}</option>
                })
              }
            </select>
        </div>
        <div className='filtrediv' style={{flex:5}}>
            <h3 className='filtretext'>Search </h3>
            <input className='arainp' value={search} onChange={(v)=>{
              //! Arama inputu boş değilse ve değişmişse sayfayı 1 yapar
              //? 2. sayfadayken arama yerine birşeyler yazmaya başlayınca 2. sayfada kaldığı için
              //! Arama inputu boş değilse ve değişmişse selectId yi 0 yapar
              //? Arama inputu ile birlikte idye göre de filtreleme yaptığı için
              if(v.target.value.trim() != "")
              {
                dispatch(setSelectId(0))
                dispatch(setSayfa(1))
              }
              dispatch(setSearch(v.target.value))}}/>
        </div>
        <div className="filtrediv" style={{flex:2}}>
            <h3 className='filtretext'>Sort</h3>
            <select className='filtreselect' onChange={(v)=>{dispatch(setSiralama(v.target.value))}}>
                <option className='filtreoption' selected={siralama == 1&&true} value={1}>Oldest</option>
                <option className='filtreoption' selected={siralama !=1 &&true} value={2}>Newest</option>
            </select>
        </div>
      </div>
      <div className='tablobolumlerdiv'>
        <div className='tablobolumdiv' style={{flex:1, marginLeft:10}}>
            <h3 className='tablobolumtext'>
              Id
            </h3>
        </div>
        <div className='tablobolumdiv' style={{flex:3, marginLeft:10}}>
            <h3 className='tablobolumtext'>
              Title
            </h3>
        </div>
        <div className='tablobolumdiv' style={{flex:2, marginLeft:10}}>
            <h3 className='tablobolumtext'>
              Description
            </h3>
        </div>
        <div className='tablobolumdiv' style={{flex:1, marginLeft:10}}>
            <h3 className='tablobolumtext'>
              Created At
            </h3>
        </div>
        {
          isAuth &&
          <div className='tablobolumdiv' style={{flex:2, marginRight:10, justifyContent:'center'}}>
            
          </div>
        }
      </div>
    </div>
  )
}

export default TableHead