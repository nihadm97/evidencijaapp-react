import React from 'react'
import axios from "axios";
import {useState} from "react";

const Registracija = () => {

  const [poruka, setPoruka] = useState('');
  const [username, setInput] = useState('');
  const [pwd, setInput1] = useState('');
  const [pwd1, setInput5] = useState('');
  const [ime, setInput2] = useState('');
  const [prezime, setInput3] = useState('');
  const [email, setInput4] = useState('');

    function login(){
      if(ime.length>0 && prezime.length>0 && email.length>0 && username.length>0){
      axios.post('http://127.0.0.1:8000/registracija/',{
        ime: ime,
        prezime: prezime,
        email: email,
        ime_korisnika: username,
        password: pwd,
        password1: pwd1
      }).then((response) => { setPoruka(response.data);
        if(response.data=="Registrovan korisnik"){setTimeout(function() {
          window.open("/", "_self")
    }, 2000);}
        else {setTimeout(function() {
          document.location.reload()
    }, 2000);}
      }, (error) => {console.log(error)} )}}

    return (
      <div className="container" style = {{marginTop: 20}}>
      <h2 style={{color: "#DB3D44"}}>Registracija</h2>
      <p>{poruka}</p>
      <form>
      <div className="form-group" >
      <label htmlFor="name">Ime:</label>
      <input type="text" className="form-control" id="name" placeholder="Unesite svoje ime" value={ime} onInput={e => setInput2(e.target.value)} name="name" required />
      </div>
      <div className="form-group">
      <label htmlFor="last_name">Prezime:</label>
      <input type="text" className="form-control" id="last_name" placeholder="Unesite svoje prezime" value={prezime} onInput={e => setInput3(e.target.value)} name="last_name" required />
      </div>
      <div className="form-group">
      <label htmlFor="username">Unesite korisničko ime:</label>
      <input type="text" className="form-control" id="username" placeholder="Unesite korisničko ime" value={username} onInput={e => setInput(e.target.value)} name="username" required />
      </div>
      <div className="form-group">
      <label htmlFor="email">Email:</label>
      <input type="email" className="form-control" id="email" placeholder="Unesite svoj email" value={email} onInput={e => setInput4(e.target.value)} name="email" required />
      </div>
      <div className="form-group">
      <label htmlFor="pwd">Password:</label>
      <input type="password" className="form-control" id="pwd" placeholder="Unesite vaš password" value={pwd} onInput={e => setInput1(e.target.value)} name="pwd" required />
      </div>
      <div className="form-group">
      <label htmlFor="pwd">Potvrdite password:</label>
      <input type="password" className="form-control" id="ppwd" placeholder="Potvrdite vaš password" value={pwd1} onInput={e => setInput5(e.target.value)} name="ppwd" required />
      </div> 
      <button style={{color: "white", backgroundColor: "#DB3D44"}} type="submit" className="btn btn-default" onClick = {login}>Registruj me</button>
      </form>
      </div>
    )
}

export default Registracija
