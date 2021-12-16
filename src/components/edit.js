import React, { Component } from 'react';
import axios from 'axios';


class Edit extends Component {
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

    // adding the hook componentDidMount()
    componentDidMount(){
        // HTTP GET request
        axios.get('http://localhost:4000/api/clubs/'+ this.props.match.params.id)
        .then((response)=>{
            this.setState({
                Club:response.data.Club,
                Position:response.data.Position,
                Crest:response.data.Crest,
                _id:response.data._id
            })
        })
        .catch();
    }

    handleSubmit(event) {
        console.log("Name: " +this.state.Club+
        " Position: " + this.state.Position +
        "Crest: " + this.state.Crest);

        // method "NewClub"
        const NewClub = {
            Club: this.state.Club,
            Position: this.state.Position,
            Crest: this.state.Crest
        }

        // passing up URL and data.
        axios.put('http://localhost:4000/api/clubs/' + this.state._id, NewClub)
        .then((response)=>{console.log(response)})
        .catch();
        

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
                <h1>Edit Team Predicted Position!</h1>
                <form onSubmit={this.handleSubmit}>

                    <div className="form-group">
                        <label>Edit Club Name: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.Club}
                            onChange={this.onChangeClubName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Edit Club Predicted Position: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.Position}
                            onChange={this.onChangeClubPosition}
                        />
                    </div>
                    <div className="form-group">
                        <label>Edit Club Crest: </label>
                        <textarea type="text"
                            className="form-control"
                            value={this.state.Crest}
                            onChange={this.onChangeClubCrest}
                        />
                    </div>
                    <div>
                        <input type="submit" value="Edit Club"
                            className="btn btn-primary"></input>
                    </div>
                </form>
            </div>
        );
    }
}
export default Edit;