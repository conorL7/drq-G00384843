import React, { Component } from 'react';
import Clubs from './clubs';
import axios from 'axios';

class Read extends Component
{
    // adding constructor to bind to method
    constructor(){
        super();
        this.ReloadData = this.ReloadData.bind(this);
    }

    // ReloadData() method. Fetches data for clubs from database.
    ReloadData(){
        axios.get('http://localhost:4000/api/clubs')
        .then((response)=>{
            this.setState({myclubs: response.data})
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    componentDidMount(){
        axios.get('http://localhost:4000/api/clubs')
        .then((response)=>{
            this.setState({myclubs: response.data})
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    state = {
        myclubs: []            
    };

    // passing down ReloadData()
    render(){
        return(
            <div>
                <h1>Your Predicted Top 4!</h1>
                <Clubs clubs={this.state.myclubs} ReloadData={this.ReloadData}></Clubs>
            </div>
        );
    }
}
export default Read;