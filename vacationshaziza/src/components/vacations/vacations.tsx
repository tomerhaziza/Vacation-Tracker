import { Component } from 'react'
import Card from '../card/card';
import axios from "axios";
import "./vacations.css"
import { Vacation } from '../../models/Vacation';
import { io } from 'socket.io-client'
import UserPanel from '../user-panel/user-panel';


interface VacationsState {
    vacations: Vacation[]
    followedVacations: Vacation[]
    notFollowedVacations: Vacation[]
    isAdmin: boolean
    username: string
}

export default class Vacations extends Component<any, VacationsState>{

    public constructor(props: any) {
        super(props);
        this.state = {
            vacations: [],
            followedVacations: [],
            notFollowedVacations: [],
            isAdmin: false,
            username: ''
        }
    }

    public async componentDidMount() {        
        if (!localStorage.getItem('token')){
            this.props.history.push('/')
        }
        await this.isAdmin();
        if (this.state.isAdmin) {
            this.getAllVacations();
        }
        else {
            this.getAllUserVacations();
        }


        // Socket IO updates
        const token = localStorage.getItem('token');
        const socket = io('http://localhost:3002/', { query: 'token=' + token }).connect();

        socket.on("UPDATE VACATIONS", () => {
            if (this.state.isAdmin) {
                this.getAllVacations();
            }
            else {
                this.getAllUserVacations();
            }
        })
    }

    private isAdmin = async () => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        const userData = await axios.get("http://localhost:3001/users/me");
        this.setState({ username: userData.data.username });

        const userType = userData.data.userType;
        if (userType === 'ADMIN') {
            this.setState({ isAdmin: true })
        }
        else {
            this.setState({ isAdmin: false });
        }
    }

    private getAllVacations = async () => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        const response = await axios.get<Vacation[]>("http://localhost:3001/vacations");
        let vacations = response.data;
        this.setState({ vacations });
    }

    private getAllUserVacations = async () => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        const followedVacationsResposne = await axios.get<Vacation[]>("http://localhost:3001/followed-vacations");
        let followedVacations = followedVacationsResposne.data;

        const notFollowedVacationsResposne = await axios.get<Vacation[]>("http://localhost:3001/followed-vacations/not");
        let notFollowedVacations = notFollowedVacationsResposne.data;
        this.setState({ followedVacations, notFollowedVacations })


    }

    public render() {
        const { isAdmin, vacations, followedVacations, notFollowedVacations, username } = this.state
        return (
            <div className="vacations">
                <UserPanel username={username} />
                {isAdmin &&
                    <div className='vacation-cards flex'>
                        {vacations.map(vacation => {
                            return (
                                <Card key={vacation.id} vacation={vacation} isAdmin={isAdmin} followed={false} updateVacations={this.getAllUserVacations} />
                            )
                        })}
                    </div>
                }
                {!isAdmin &&
                    <div className='vacation-cards flex'>
                        {followedVacations.map(vacation => {
                            return (
                                <Card key={vacation.id} vacation={vacation} isAdmin={isAdmin} followed={true} updateVacations={this.getAllUserVacations} />
                            )
                        })}

                        {notFollowedVacations.map(vacation => {
                            return (
                                <Card key={vacation.id} vacation={vacation} isAdmin={isAdmin} followed={false} updateVacations={this.getAllUserVacations} />
                            )
                        })}
                    </div>
                }
            </div>
        );
    }
}