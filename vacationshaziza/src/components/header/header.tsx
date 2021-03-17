import React, { Component } from 'react'
import "./header.css"
import { store } from '../../redux/store';
import { ActionType } from '../../redux/action-type';


export default class Header extends Component {

    //Redux dispatch test
    private handle1(){
        store.dispatch({ type: ActionType.UpdateUserType, payload: 'admin' })
   }

    public render() {
    
        return (
            <div className="header">
                <h1>your next vacation</h1>
                <button onClick={this.handle1}>Update state on layout</button>
            </div>
        );
    }
}