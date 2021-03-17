import axios from "axios";
import { ChangeEvent, Component } from "react";
import { NewVacationDetails } from "../../models/NewVacationDetails";
import AdminNavbar from "../admin-navbar/admin-navbar";
import './add-vacation.css'

interface AddVacationState {
    destination: string
    description: string
    imageUrl: string
    price: number
    startDate: string
    endDate: string
    formData: any
}

export default class AddVacation extends Component<any, AddVacationState>{
    public constructor(props: any) {
        super(props);
        this.state = {
            destination: '',
            description: '',
            imageUrl: '',
            price: undefined,
            startDate: '',
            endDate: '',
            formData: null
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

    private uploadImage = async (args: ChangeEvent<HTMLInputElement>) => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        const imageFile = args.target.files[0];
        let formData = new FormData();
        formData.set('vacationImage', imageFile);
        this.setState({ formData });

        let imageUrl = URL.createObjectURL(imageFile);
        this.setState({ imageUrl });
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


    private addVacation = async () => {
        try {
            // Image upload
            const uplaodResponse = await axios.post('http://localhost:3001/vacations/upload', this.state.formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            const imageData = uplaodResponse.data;
            const imageUrl = 'http://localhost:3001/uploads/' + imageData.filename;
            this.setState({ imageUrl });

            // Token authentication
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            let newVacationDetails = new NewVacationDetails(this.state.destination, this.state.description, this.state.imageUrl, this.state.price, this.state.startDate, this.state.endDate);
            const response = await axios.post("http://localhost:3001/vacations/", newVacationDetails);
            const serverResponse = response.data;
            console.log(serverResponse);
            this.props.history.push('/vacations/admin');
            console.log("Vacation added successfully");
        }
        catch (err) {
            alert(err.message);
            console.log(err);
            throw new Error('test');
        }
    }

    public render() {
        return (
            <>
                <AdminNavbar />
                <div className="add-vacation">
                    <input type="text" placeholder='Enter destination' value={this.state.destination} onChange={this.setDestination} /><br />
                    <input type="text" placeholder='Enter description' value={this.state.description} onChange={this.setDescription} /><br />
                    <input type="number" placeholder='Enter price' value={this.state.price || ''} onChange={this.setPrice} /><br />
                    <input type="date" placeholder='Enter start date' value={this.state.startDate} onChange={this.setStartDate} /><br />
                    <input type="date" placeholder='Enter end date' value={this.state.endDate} onChange={this.setEndDate} /><br />
                    <input type="file" placeholder='Choose an image' name='vacationImage' onChange={this.uploadImage} />{this.state.imageUrl && <div className='imgThumb'><img alt='thumbnail' src={this.state.imageUrl} /></div>}<br />
                    <input type="button" className="add-vacation-button" value="Add vacation" onClick={this.addVacation} /> <br /><br />
                </div>
            </>
        );
    }
}