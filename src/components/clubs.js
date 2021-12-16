import React, { Component } from 'react';
import ClubItem from './clubitem';

class Clubs extends Component
{   // Passing down ReloadData()
    render(){
        return this.props.clubs.map((team)=>{
            return <ClubItem club={team} key={team._id} ReloadData={this.props.ReloadData}></ClubItem>
        })
    }
}
export default Clubs;