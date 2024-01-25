/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Home() {

        const navigate  = useNavigate()
        const [name, setName] = useState('')

  return (
   <div className="main-div">
     <div className="subscribe">
      <p>To Do List</p>
      <input onChange={(event)=>setName(event.target.value)} placeholder="Enter your Name" className="subscribe-input" name="name" type="text"/>
      <br />
      <div onClick={()=> navigate('/to-do-list',{ state: { name } })} className="submit-btn">SUBMIT</div>
    </div>
   </div>
  );
}

export default Home;
