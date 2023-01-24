import { useState } from 'react'
import { RiDeleteBinLine, RiDeleteBack2Fill } from 'react-icons/ri'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
import { BsListOl } from 'react-icons/bs'
import { HiUsers } from 'react-icons/hi'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

export default function CallOrder({ callOrder, removePlayer, id, selectedList, selectList, numToBook, addCalls, minusCalls, deleteList }) {
  const [randList, setRandList] = useState(false)
  const [listName, setListName] = useState('New List')


  return (
    <div onClick={() => selectList(id)} className={selectedList === id ? "call-order-list": "call-order-list opacity-30" }>
      <div className='call-order-header'>
        <div className='call-order-header-div-upper'>
          <input value={listName} onChange={e => setListName(e.target.value)} className="text-xl border rounded"/>
        </div>
        <div className='call-order-header-div-lower'>

        
        <div className='flex flex-row items-center justify-center'>
          <p>Booking {numToBook} player(s)</p>
          <button onClick={() => minusCalls(id)} className="plus-minus-btns">
            <AiOutlineMinus />
          </button>
          <button onClick={() => addCalls(id)} className="plus-minus-btns">
            <AiOutlinePlus />
          </button>
        </div>
        
          <div className='call-rand-list'>
            <button className={randList ? 'call-icon-btn opacity-10': 'call-icon-btn'} onClick={() => setRandList(false)}>
              <BsListOl />
            </button>
            <button className={randList === true ? 'call-icon-btn' : 'call-icon-btn opacity-10'} onClick={() => setRandList(true)}>
              <GiPerspectiveDiceSixFacesRandom />
            </button>
            <button className={randList === 'callAll' ? 'call-icon-btn' : 'call-icon-btn opacity-10'} onClick={() => setRandList('callAll')}>
              <HiUsers />
            </button>
          </div>
          <button className='bin-btn' onClick={() => deleteList(id)}>
            <RiDeleteBinLine />
          </button>
        </div>
      </div>
      {callOrder.length === 0 
      ? <div className='call-order-item text-gray-500'>Add players from below</div>
      : callOrder.map(i => (
        <div key={i.name} className="call-order-item">
          <p>{i.name} <span className='text-gray-300'>{i.instrument}</span></p>
          <button className='bin-btn' onClick={() => removePlayer(i)}>
            <RiDeleteBack2Fill />
          </button>
        </div>
      ))}
    </div>
  )
}