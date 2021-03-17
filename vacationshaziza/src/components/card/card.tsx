import { Component } from 'react';
import './card.css';
import Moment from 'react-moment';
import { Vacation } from '../../models/Vacation';
import axios from "axios";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { store } from '../../redux/store';
import { ActionType } from '../../redux/action-type';
import { Link } from 'react-router-dom'

interface VacationProps {
    vacation: Vacation
    isAdmin: boolean
    followed: boolean
    updateVacations: Function
}

interface VacationState {
    vacationToChange: Vacation
    followedVacationsArray: Vacation[]
    notFollowedVacationsArray: Vacation[]
}

export default class Card extends Component<VacationProps, VacationState>{

    public constructor(props: VacationProps) {
        super(props);
        this.state = {
            vacationToChange: undefined,
            followedVacationsArray: [],
            notFollowedVacationsArray: []
        }
        store.subscribe(
            () => this.setState(
                {
                    followedVacationsArray: store.getState().followedVacationsArray,
                    notFollowedVacationsArray: store.getState().notFollowedVacationsArray
                })
        );
    }

    private removeVacation = async (vacationId: number) => {
        try {
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            await axios.delete("http://localhost:3001/vacations/" + vacationId);
        }

        catch (err) {
            alert(err.message);
            console.log(err);
        }
    }

    private editVacation = (vacationToEdit: Vacation) => {
        store.dispatch({ type: ActionType.VacationToEdit, payload: vacationToEdit });
    }

    private followVacation = async (vacationId: number) => {
        try {
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            await axios.post("http://localhost:3001/followed-vacations/" + vacationId);
            this.props.updateVacations();
        }


        catch (err) {
            alert(err.message);
            console.log(err);
        }
    }

    private unfollowVacation = async (vacationId: number) => {
        try {
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            await axios.delete("http://localhost:3001/followed-vacations/" + vacationId);
            this.props.updateVacations();
        }

        catch (err) {
            alert(err.message);
            console.log(err);
        }
    }

    public render() {
        const { vacation, isAdmin, followed } = this.props;
        let backgroundImage = {
            backgroundImage: "url(" + vacation.imageUrl + ")"
        }

        return (
            <div className="card">
                <div className="vacation-image" style={backgroundImage}>
                    <h3>{vacation.destination}</h3>
                </div>

                <footer className="vacationFooter">
                    <div className="left">
                        <p>{vacation.description}</p>
                        <p>from: ${vacation.price}</p>
                        <p><Moment format="ddd, MMM DD">{vacation.startDate}</Moment> - <Moment format="dd, MMM-DD">{vacation.endDate}</Moment></p>
                    </div>

                    <div className="right">
                        {isAdmin && <button className='icon-style' onClick={() => this.removeVacation(vacation.id)}>
                            <DeleteIcon fontSize="large" />
                        </button>}

                        {isAdmin &&
                            <Link to="/vacations/admin/change-vacation" >
                                <button className='icon-style' onClick={() => this.editVacation(vacation)}>
                                    <EditIcon fontSize="large" />
                                </button>
                            </Link>
                        }

                        {!isAdmin && !followed && <button className='icon-style' onClick={() => this.followVacation(vacation.id)}>
                            <FavoriteIcon className='followed' fontSize="large" />
                        </button>}

                        {!isAdmin && followed && <button className='icon-style' onClick={() => this.unfollowVacation(vacation.id)}>
                            <FavoriteIcon className='unfollowed' fontSize="large" />
                        </button>}
                    </div>
                </footer>
            </div>
        )
    }
}