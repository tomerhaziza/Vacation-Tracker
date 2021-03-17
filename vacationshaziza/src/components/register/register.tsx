import { Component, ChangeEvent } from 'react';
import axios from "axios";
import { UserRegisterDetails } from '../../models/UserRegisterDetails';
import { Link } from 'react-router-dom'
import './register.css'
import { UserLoginDetails } from '../../models/UserLoginDetails';
import { SuccessfulLoginServerResponse } from '../../models/SuccessfulLoginServerResponse';

interface PasswordValidity {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    passwordValidityMessage: string
}

export default class Register extends Component<any, PasswordValidity> {

    public constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            passwordValidityMessage: ''
        };
    }

    private setUserName = (args: ChangeEvent<HTMLInputElement>) => {
        const username = args.target.value;
        this.setState({ username });
    }

    private setPassword = (args: ChangeEvent<HTMLInputElement>) => {
        const password = args.target.value;
        this.setState({ password }, () => {
            if (this.state.password.length >= 5 && this.state.password.length <= 10) {
                this.setState({ passwordValidityMessage: 'Valid password' })
            }

            else {
                this.setState({ passwordValidityMessage: 'Invalid password' })
            }
        })
    }

    private setFirstName = (args: ChangeEvent<HTMLInputElement>) => {
        const firstName = args.target.value;
        this.setState({ firstName });
    }

    private setLastName = (args: ChangeEvent<HTMLInputElement>) => {
        const lastName = args.target.value;
        this.setState({ lastName });
    }

    private register = async () => {
        const { username, password, firstName, lastName } = this.state;
        try {
            if (!username || !password || !firstName || !lastName) {
                alert('ERROR: Missing parameters');
                return;
            }
            let userRegisterDetails = new UserRegisterDetails(username, password, firstName, lastName);
            await axios.post("http://localhost:3001/users", userRegisterDetails);
            this.props.history.push('/login');

            // Auto login after register
            let userLoginDetails = new UserLoginDetails(username, password);
            const response = await axios.post<SuccessfulLoginServerResponse>("http://localhost:3001/users/login", userLoginDetails);
            const serverResponse = response.data;

            localStorage.setItem('token', serverResponse.token);
            this.props.history.push('/vacations')
        }

        catch (err) {
            alert(err.message);
            console.log(err);
        }
    }

    public render() {
        return (
            <div className="register">
                <input type="text" id="username" placeholder="Username" value={this.state.username} onChange={this.setUserName} /><br />
                <input type="password" id="password" placeholder="New password" value={this.state.password} onChange={this.setPassword} /><br />
                <input type="text" id="firstname" placeholder="First name" value={this.state.firstName} onChange={this.setFirstName} /> <br />
                <input type="text" id="lastname" placeholder="Last name" value={this.state.lastName} onChange={this.setLastName} /> <br />
                <input type="button" className="register-button" value="Sign up" onClick={this.register} /><br />
                {this.state.passwordValidityMessage} <br />
                Already have an account? <Link to="/login">Sign in</Link>
            </div>
        );
    }
}