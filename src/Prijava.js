import React from 'react';
import axios from "axios";
import {useState} from "react";
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

const Prijava = () => {

    const [poruka, setPoruka] = useState('');
    const [pwd, setInput1] = useState('');
    const [username1, postaviUsername] = useState('');

    function login(e){
      e.preventDefault();
      axios.post('http://127.0.0.1:8000/prijava/',{
        ime_korisnika: username1,
        password: pwd
      }).then((response) => {
        if(response.data!="Pogrešno korisničko ime ili lozinka"){setPoruka("Uspješna prijava"); window.open("http://localhost:3000/home", "_self")}
        else setPoruka(response.data);
      }, (error) => {console.log(error)})
    }

    return (
      <form>
      <div id="forma" style = {{marginTop: 120, marginLeft: 90}}>
      <h2 style={{color: "#DB3D44"}}>Prijava</h2>
      <p>{poruka}</p>
      <button className="btn btn-default" style={{float: "right", backgroundColor: "#DB3D44"}} type="submit"><Link to="/registracija" style= {{color: "white"}}>Registracija</Link></button><br></br>
      <div className="form-group">
      <label htmlFor="username">Korisničko ime:</label>
      <input type="text" className="form-control" id="username" value={username1} onInput={e => postaviUsername(e.target.value)} placeholder="Unesite korisničko ime" name="username" required />
      </div>
      <div className="form-group">
      <label htmlFor="pwd">Password:</label>
      <input type="password" className="form-control" id="pwd" value={pwd} onInput={e => setInput1(e.target.value)} placeholder="Unesite password" name="pwd" required />
      </div>
      <button style={{backgroundColor: "#DB3D44", color: "white"}} className="btn btn-default" onClick = {login}>Prijavi me</button>
      <a href=" " style={{marginLeft: 20}}><Link to="/zaboravljena" style={{color: "#DB3D44"}}>Zaboravljena šifra</Link></a>
      </div>
      </form>
    )
}

export default Prijava
