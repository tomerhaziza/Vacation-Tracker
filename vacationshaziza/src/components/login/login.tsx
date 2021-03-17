import React, { Component, ChangeEvent } from 'react'
import axios from "axios";
import "./login.css";
import { UserLoginDetails } from '../../models/UserLoginDetails';
import { SuccessfulLoginServerResponse } from '../../models/SuccessfulLoginServerResponse';
import { Link } from 'react-router-dom';


interface LoginState {
    username: string,
    password: string
}

export default class Login extends Component<any, LoginState>{

    public constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    private setUserName = (args: ChangeEvent<HTMLInputElement>) => {
        const username = args.target.value;
        this.setState({ username });
    }

    private setPassword = (args: ChangeEvent<HTMLInputElement>) => {
        const password = args.target.value;
        this.setState({ password });
    }

    private login = async () => {
        const { username, password } = this.state;
        try {
            if (!username || !password) {
                alert('Error: Missing parameters');
                return;
            }

            let userLoginDetails = new UserLoginDetails(username, password);
            const response = await axios.post<SuccessfulLoginServerResponse>("http://localhost:3001/users/login", userLoginDetails);
            const serverResponse = response.data;

            // User login token
            const token = serverResponse.token;

            // JWT authentication
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            localStorage.setItem('token', token);

            if (serverResponse.userType === "ADMIN") {
                this.props.history.push('/vacations/admin')
            }

            else {
                this.props.history.push('/vacations')
            }
        }

        catch (err) {
            alert(err.message);
            console.log(err);
        }
    }

    public render() {
        return (
            <div className="login-page">
                <div className='welcome-message'>
                    Welcome to Your Next Vacation! <br />
                    Here you can find your next vacation. <br />
                    To continue, please log in.
                    </div>
                <div className="login">
                    <input type="text" placeholder="User name" name="username"
                        value={this.state.username} onChange={this.setUserName} /><br />
                    <input type="password" placeholder="Password" name="password"
                        value={this.state.password} onChange={this.setPassword} /><br />
                    <input type="button" className="login-button" value="Log in" onClick={this.login} /> <br /><hr />
                    <Link className="register-button" to="/register">Create new account</Link>
                </div>
            </div>
        );
    }
}