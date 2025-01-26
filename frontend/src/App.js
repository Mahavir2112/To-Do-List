import {useEffect, useState} from 'react'
import axios from "axios"
import {format} from "date-fns"

import './App.css';

const baseUrl = "http://localhost:8080"

function App() {
  const [description, setDescription]=useState("");
  const [editDescription, setEditDescription]=useState("");
  const [eventsList, setEventsList]=useState([]);
  const [eventId, setEventId]=useState(null);

  const fetchEvents=async()=>{
    const data=await axios.get(`${baseUrl}/events`)
    const {events}=data.data
    setEventsList(events);
    console.log("DATA: ", data)
  }

  const deleteEvent=async(id)=>{
    try{
      await axios.delete(`${baseUrl}/events/${id}`)
      const updatedlist = eventsList.filter(event=>event.id!=id)
      setEventsList(updatedlist);
  } catch(err){
    console.error(err.message)
  }}

  const handleChange=(e,field)=>{
    if(field=='edit'){
      setEditDescription(e.target.value)
    }
    else{
      setDescription(e.target.value);
    }
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      if(editDescription){
        const data = await axios.put(`${baseUrl}/events/${eventId}`, {description:editDescription});
        const updatedEvent=data.data.event;
        const updatedList=eventsList.map(event=>{
          if(event.id==eventId){
            return event=updatedEvent
          }
          return event
        })
        setEventsList(updatedList)
      } else{
        const data=await axios.post(`${baseUrl}/events`, {description})
        setEventsList([...eventsList, data.data]);
      }
      setDescription('');
      setEditDescription('');
      setEventId(null);
    } catch(err){
      console.error(err.message)
    }
  }

  const handleEdit = (event)=>{
    setEventId(event.id);
    setEditDescription(event.description);
  }

  useEffect(()=>{
    fetchEvents()
  },[])

  return (
    <div className="App">
      <section>
        <form onSubmit={handleSubmit}>
          <label style={{fontSize:'30px'}} htmlFor='description'>Description</label>
          <input class='temp'
            onChange={(e)=>handleChange(e,'description')}
            type='text'
            name='description'
            id='description'
            placeholder='--Describe the event--'
            value={description}
          />
          <button type='submit'>Submit</button>
        </form>
      </section>
      <section>
        <ul>
          {eventsList.map(event=>{
            if(eventId==event.id){
              return (
                <form onSubmit={handleSubmit} key={event.id}>
                  <input
                    onChange={(e)=>handleChange(e,'edit')}
                    type='text'
                    name='editDescription'
                    id='editDescription'
                    value={editDescription}
                  />
                  <button type="submit">Submit</button>
                </form>
              )
            }
            else{
              return (
                <div>
                  <li style={{display:"flex", fontSize:'20px', color:'lightgreen'}} key={event.id}>
                  {event.description}
                    <button style={{marginLeft:'10px',marginTop:'10px', paddingBottom:'2px', fontSize:'9px'}} onClick={()=>handleEdit(event)}>Edit</button>
                    <button style={{marginLeft:'10px',marginTop:'10px', paddingBottom:'2px', fontSize:'9px'}} onClick={()=>deleteEvent(event.id)}>Delete</button>
                  </li>
                </div>
              )
            }
          })}
        </ul>
      </section>
    </div>
  );
}

export default App;
