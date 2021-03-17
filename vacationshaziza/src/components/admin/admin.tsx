import { Component } from "react";
import Vacations from "../vacations/vacations";

import axios from "axios";
import AdminNavbar from "../admin-navbar/admin-navbar"

interface AdminState {
    isAdmin: boolean
}

export default class Admin extends Component<any, AdminState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            isAdmin: false
        }
    }

    public async componentDidMount() {
        if (!localStorage.getItem('token')){
            this.props.history.push('/')
        }
        this.isAdmin();
    }

    private isAdmin = async () => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        const userData = await axios.get("http://localhost:3001/users/me");
        const userType = userData.data.userType;
        if (userType === 'ADMIN') this.setState({ isAdmin: true })
        else this.setState({ isAdmin: false });
    }

    public render() {
        const { isAdmin } = this.state;
        return (
            <div className="admin">
                {isAdmin &&
                    <div className="admin-control-panel">
                        <AdminNavbar />
                        <Vacations />
                    </div>
                }
            </div>
        );
    }
}