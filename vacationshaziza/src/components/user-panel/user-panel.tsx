import { Link } from 'react-router-dom';
import React, { Component } from 'react'
import "./user-panel.css"

interface UserProps {
    username: string
}

export default class UserPanel extends Component<UserProps>{

    private logout = () => {
        localStorage.removeItem("token");
    }

    public render() {
        const { username } = this.props;
        return (
            <div className='user-panel'>
                <p>Welcome, {username}</p>
                <Link to="/login" onClick={this.logout}>Logout</Link>
            </div>
        );
    }
}