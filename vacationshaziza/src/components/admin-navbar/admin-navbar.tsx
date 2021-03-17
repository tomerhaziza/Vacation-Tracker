import { Component } from "react";
import "./admin-navbar.css";
import { Link } from 'react-router-dom';


export default class AdminNavbar extends Component {

    public render() {
        return (
            <div className="admin-navbar">
                <div className="nav-wrapper">
                    <div className="nav">
                        <ul>
                            <li><Link to="/vacations/admin"><button className='nav-btn active'>Home</button></Link></li>
                            <li><Link to="/vacations/admin/add-vacation"><button className='nav-btn'>Add vacation</button></Link></li>
                            <li><Link to="/vacations/admin/charts"><button className='nav-btn'>Charts</button></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}