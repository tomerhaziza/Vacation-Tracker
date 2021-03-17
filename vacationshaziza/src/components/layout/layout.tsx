import { Component } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import './layout.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import Login from '../login/login';
import Vacations from '../vacations/vacations';
import Register from '../register/register';
import Admin from '../admin/admin';
import AddVacation from '../add-vacation/add-vacation';
import ChangeVacation from '../change-vacation/change-vacation';
import Chart from '../charts/victory-charts'
import { store } from '../../redux/store';
import { ActionType } from '../../redux/action-type';

interface UserState {
    userType: string
}

export default class Layout extends Component<any, UserState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            userType: ''
        };

        store.subscribe(
            () => this.setState(
                {
                    userType: store.getState().userType
                })
        );
    }

    public render() {
        // Redux test
        if (this.state.userType != ''){
            alert('worked');
        }

        let token = localStorage.getItem('token'),
            redirect;
        if (token) {
            redirect = '/vacations';
        }
        else {
            redirect = '/login';
        }
        return (
            <BrowserRouter>
                <section className="layout">
                    <header>
                        <Header />
                    </header>

                    <main>
                        <Switch>
                            <Route path="/login" component={Login} exact />
                            <Route path="/vacations" component={Vacations} exact />
                            <Route path="/register" component={Register} exact />
                            <Route path="/vacations/admin" component={Admin} exact />
                            <Route path="/vacations/admin/add-vacation" component={AddVacation} exact />
                            <Route path="/vacations/admin/change-vacation" component={ChangeVacation} exact />
                            <Route path="/vacations/admin/charts" component={Chart} exact />
                            <Redirect from="/" to={redirect} exact />
                        </Switch>
                    </main>

                    <footer>
                        <Footer />
                    </footer>
                </section>
            </BrowserRouter>

        );
    }
}