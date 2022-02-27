import Navbar from 'react-bootstrap/Navbar';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from 'react-router-dom';
import {useState} from "react";
import axios from "axios";

export const Header = () => {

    const [username, Postavi]=useState("")
    const [status, Postavi1]=useState("")
    const [stil, Postavi2]=useState("")

    axios.get('http://127.0.0.1:8000/username/').then((response) => {
        Postavi(response.data[0].fields.ime_korisnika);
        Postavi1(response.data[0].fields.status);
        if(response.data[0].fields.stil=="Standardna") {Postavi2("#DB3D44");}
        if(response.data[0].fields.stil=="Tamna") {Postavi2("#000000");}
        if(response.data[0].fields.stil=="Svijetla") {Postavi2("#ffb6c1");}
        }, (error) => {console.log(error)})
    function odjava(){
        axios.post('http://127.0.0.1:8000/odjava/',{
        username: username,
      }).then((response) => {
          window.open("/", "_self");
      }, (error) => {console.log(error)})
            }
    return (
        <Navbar className="bg-light justify-content-between" fixed="top" expand="lg" >
            <Navbar.Brand>Evidencija-app</Navbar.Brand>
            <Navbar.Brand><img
                src="/favicon.ico"
                width="40"
                height="40"
                alt=""/>
            </Navbar.Brand>
            <Navbar.Brand>{username}</Navbar.Brand>
            <Navbar.Brand>{status}</Navbar.Brand>
            <Link to="/" ><button className="btn btn-default" style={{color: "white", backgroundColor: stil}} onClick={odjava}>Odjava</button></Link>
        </Navbar >
    )
}
export default Header