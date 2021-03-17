import axios from "axios";
import { ChangeEvent, Component } from "react";
import { NewVacationDetails } from "../../models/NewVacationDetails";
import { Vacation } from "../../models/Vacation";
import { store } from '../../redux/store';
import './change-vacation.css'
import AdminNavbar from "../admin-navbar/admin-navbar";


interface ChangeVacationState {
    vacationToEdit: Vacation
    destination: string,
    description: string,
    imageUrl: string,
    price: number,
    startDate: string,
    endDate: string,
}


export default class ChangeVacation extends Component<any, ChangeVacationState>{

    public constructor(props: any) {
        super(props);
        store.subscribe(
            () => this.setState(
                {
                    vacationToEdit: store.getState().vacationToEdit
                })
        );
        this.state = {
            vacationToEdit: store.getState().vacationToEdit,
            destination: store.getState().vacationToEdit.destination,
            description: store.getState().vacationToEdit.description,
            imageUrl: store.getState().vacationToEdit.imageUrl,
            price: store.getState().vacationToEdit.price,
            startDate: store.getState().vacationToEdit.startDate.toString().split('T')[0],
            endDate: store.getState().vacationToEdit.endDate.toString().split('T')[0]
        };


    }

    private setDestination = (args: ChangeEvent<HTMLInputElement>) => {
        const destination = args.target.value;
        this.setState({ destination });
    }

    private setDescription = (args: ChangeEvent<HTMLInputElement>) => {
        const description = args.target.value;
        this.setState({ description });
    }

    private setPrice = (args: ChangeEvent<HTMLInputElement>) => {
        const price = +args.target.value;
        this.setState({ price });
    }

    private setStartDate = (args: ChangeEvent<HTMLInputElement>) => {
        const startDate = args.target.value;
        this.setState({ startDate });
    }

    private setEndDate = (args: ChangeEvent<HTMLInputElement>) => {
        const endDate = args.target.value;
        this.setState({ endDate });
    }

    private changeVacation = async () => {
        try {
            let newVacationDetails = new NewVacationDetails(this.state.destination, this.state.description, this.state.imageUrl, this.state.price, this.state.startDate, this.state.endDate);
            await axios.put("http://localhost:3001/vacations/" + this.state.vacationToEdit.id, newVacationDetails);
            this.props.history.push('/vacations/admin');
        }
        catch (err) {
            alert(err.message);
            console.log(err);
        }
    }

    public render() {
        return (
            <>
                <AdminNavbar />
                <div className="change-vacation">
                    <input type="text" placeholder='Enter destination' value={this.state.destination} onChange={this.setDestination} /><br />
                    <input type="text" placeholder='Enter description' value={this.state.description} onChange={this.setDescription} /><br />
                    <input type="number" placeholder='Enter price' value={this.state.price} onChange={this.setPrice} /><br />
                    <input type="date" placeholder='Enter start date' value={this.state.startDate} onChange={this.setStartDate} /><br />
                    <input type="date" placeholder='Enter end date' value={this.state.endDate} onChange={this.setEndDate} /><br />
                    <input type="button" className="change-vacation-button" value="Change vaction" onClick={this.changeVacation} /> <br /><br />
                </div>
            </>
        );
    }
}