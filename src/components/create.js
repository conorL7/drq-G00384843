import React, { Component } from 'react';
import axios from 'axios';

class Create extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeClubName = this.onChangeClubName.bind(this);
        this.onChangeClubPosition = this.onChangeClubPosition.bind(this);
        this.onChangeClubCrest = this.onChangeClubCrest.bind(this);
        this.state = {
            Club: '',
            Position: '',
            Crest: ''
        }
    }

    handleSubmit(event) {
        console.log("Club: " +this.state.Club+
        " Position: " + this.state.Position +
        "Crest: " + this.state.Crest);

        const NewClub = {
            Club: this.state.Club,
            Position: this.state.Position,
            Crest: this.state.Crest
        }

        axios.post('http://localhost:4000/api/clubs', NewClub)
        .then((response)=>{
            console.log(response)
        })
        .catch((err)=>{
            console.log(err);
        })

        event.preventDefault();
        this.setState({
            Club:'',
            Position:'',
            Crest:''
        });
    }
    onChangeClubName(event) {
        this.setState({
            Club: event.target.value
        })
    }
    onChangeClubPosition(event) {
        this.setState({
            Position: event.target.value
        })
    }
    onChangeClubCrest(event){
        this.setState({
            Crest: event.target.value
        })
    }

    render() {
        return (
            <div>
                <h1>Add a Club!</h1>
                <form onSubmit={this.handleSubmit}>

                    <div className="form-group">
                        <label>Add Club Name: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.Club}
                            onChange={this.onChangeClubName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Add Club Predicted Position: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.Position}
                            onChange={this.onChangeClubPosition}
                        />
                    </div>
                    <div className="form-group">
                        <label>Add Club Crest: </label>
                        <textarea type="text"
                            className="form-control"
                            value={this.state.Crest}
                            onChange={this.onChangeClubCrest}
                        />
                    </div>
                    <div>
                        <input type="submit" value="Add Club"
                            className="btn btn-primary"></input>
                    </div>
                </form>
            </div>
        );
    }
}
export default Create;