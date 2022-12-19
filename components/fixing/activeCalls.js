import { useEffect, useState } from 'react'
import { GiEnvelope, GiConfirmed, GiCancel } from 'react-icons/gi'
import { IoIosRemoveCircleOutline } from 'react-icons/io'
import axios from "axios"
import { List, ListItem } from '@mui/material'

export default function ActiveCalls(props) {
  const {instrumentName, instrumentSection, editList, instrumentFixed, refreshProps, closeEdit} = props
  const [callList, setCallList] = useState([])

  useEffect(() => {
    setCallList([...instrumentSection.musicians.sort((a, b) => a.id - b.id)])
  }, [editList])

  const removePlayer = e => {
    let obj = {
      playerCallId: e.id,
      musicianEmail: e.musicianEmail
    };

    axios.post('/api/fixing/unfixPlayer', obj)
    .then(() => {
        closeEdit();
        refreshProps();
      })
    .catch(function (error) {
      console.log(error);
    });
  }

  const acceptPlayer = e => {
    let obj = {
      playerCallId: e.id,
      musicianEmail: e.musicianEmail
    };

    axios.post('/api/fixing/fixPlayer', obj)
    .then(() => {
        closeEdit();
        refreshProps();
      })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className="active-calls-div" data-testid={`${instrumentName}-active-calls`}>
      {instrumentFixed 
      ? <div className='pl-2'>
        <p className='text-gray-500'>Booked {instrumentSection.numToBook} player(s)</p>
      </div>
      : <div className='calls-info'>
          <p className="text-gray-500 pl-2 text-sm">Booking {instrumentSection.numToBook} player(s)</p>
          <p className="text-gray-500 pl-2 text-sm">Calls are {instrumentSection.callOrder.toLowerCase()}</p>
        </div>}
        <div className='call-list-div'>
      {instrumentSection.musicians.sort((a, b) => a.id - b.id).map(i => (
        <div key={i.id} data-testid={`${i.musician.name}-${i.id}`} className={i.accepted === true 
        ? "call-list-item" 
        : i.accepted === false 
        ? "call-list-item opacity-40 "
        : " call-list-item"}>
          <div className='flex flex-row items-center'>
          {editList === true && i.accepted === true &&<button className='mr-2 text-red-500' onClick={() => removePlayer(i)}><IoIosRemoveCircleOutline /></button>}
          {editList === true && i.accepted !== true && <button className='mr-2 text-green-500' onClick={() => acceptPlayer(i)}><GiConfirmed /></button>}
          <p className='text-black'>{i.musician.name}</p>
          </div>
          {i.accepted 
          ? <div className='text-green-500' title="Confirmed"><GiConfirmed /> </div>
          : i.accepted === false 
          ? <div title="Declined"><GiCancel /></div>
          : i.recieved 
          ? <div title="Awaiting reply"><GiEnvelope /></div>
          : <div title="Null"></div>}
        </div>
))}
</div>
    
    </div>
  )
}