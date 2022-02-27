import React from 'react'
import axios from "axios";
import {useState} from "react";

const Zaboravljena = () => {
  
  const [email, postaviemail] = useState('');
  const [poruka, postaviporuku] = useState('');

  function login(e){
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/email/',{
      email: email
    }).then((response) => { postaviporuku(response.data); window.open("http://localhost:3000/", "_self");
    }, (error) => {console.log(error)})
  }

    return (
      <div className="container" style = {{marginTop: 120}}>
      <h2 style={{color: "#DB3D44"}}>Zaboravljena lozinka</h2><br></br>
      {poruka}<br></br>
      <form action="">
          <div className="form-group">
          <label className="form-control" htmlFor="email">Email:</label>
          <input type="email" className="form-control" id="email" placeholder="Unesite vaš email" name="email" required onInput={e => postaviemail(e.target.value)} />
          </div>
          <button style={{color: "white", backgroundColor: "#DB3D44"}} type="submit" className="btn btn-default" onClick = {login}>Potvrdi</button>
      </form>
      </div>
    )
}

export default Zaboravljena
