import React from 'react'
import {Link} from 'react-router-dom';
import SideNav, {NavItem} from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {useState} from "react";
import axios from "axios";

export const Sidebar = () => {
    const [stil, Postavi2]=useState("")
    const [username, postaviUsername] = useState("")
    axios.get('http://127.0.0.1:8000/username/').then((response) => {
        postaviUsername(response.data[0].fields.oblik);
        if(response.data[0].fields.stil=="Standardna") {Postavi2("#DB3D44");}
        if(response.data[0].fields.stil=="Tamna") {Postavi2("#000000");}
        if(response.data[0].fields.stil=="Svijetla") {Postavi2("#ffb6c1");}
        }, (error) => {console.log(error)})
    return (
    <SideNav style={{height: "100%", position:"fixed", background: stil}}>
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home">
            <Link to="/home" style= {{color: "white", padding: 20}}>Početna stranica</Link>
        </NavItem>
        <NavItem eventKey="evidencija">
            <Link to="/home/evidencija" style= {{color: "white", padding: 20}}>Evidencija održane nastave</Link>
        </NavItem>
        <NavItem eventKey="kuca">
            <Link to="/home/kuca" style= {{color: "white", padding: 20}}>Evidencija rada od kuće</Link>
        </NavItem>
        <NavItem eventKey="predmeti">
            <Link to="/home/predmeti" style= {{color: "white", padding: 20}}>Predmeti</Link>
        </NavItem>
        {username == "Šef odsjeka" ? <NavItem eventKey="korisnici">
            <Link to="/home/korisnici" style= {{color: "white", padding: 20}}>Korisnici</Link>
        </NavItem> : ''}
        {username == "Dekan" ? <NavItem eventKey="korisnici">
            <Link to="/home/korisnici" style= {{color: "white", padding: 20}}>Korisnici</Link>
        </NavItem> : ''}
        <NavItem eventKey="postavke">
            <Link to="/home/postavke" style= {{color: "white", padding: 20}}>Postavke</Link>
        </NavItem>
        <NavItem eventKey="stil">
            <Link to="/home/stil" style= {{color: "white", padding: 20}}>Stil</Link>
        </NavItem>
        </SideNav.Nav>
    </SideNav>
    )
}
export default Sidebar