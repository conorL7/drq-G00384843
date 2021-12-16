import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

{/* Above: importing button component from 'react-bootstrap/Button' */ }
{/* Importing 'Link' from react-router-dom. Gives us tooling for navigation. */}

// binding to this instance of the function
class ClubItem extends Component {
    constructor(){
        super();
        this.DeleteClub = this.DeleteClub.bind(this);
    }

    // DeleteClub() method
    DeleteClub(){
        console.log('Delete: '+this.props.club._id);

        // delete movie with certain id from database
        axios.delete('http://localhost:4000/api/clubs/'+this.props.club._id)
        .then(()=>{
            // calls ReloadData in movies.js
            this.props.ReloadData();
        })
        .catch();

    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Header>{this.props.club.Club}</Card.Header>
                    <Card.Body>
                        <blockquote>
                            <img src={this.props.club.Crest}></img>
                            <footer>
                                {this.props.club.Position}
                            </footer>
                        </blockquote>
                    </Card.Body>
                    {/* Adding edit button */}
                    <Link to={"/edit/" +this.props.club._id} className="btn btn-primary">Edit</Link>
                    {/* Delete button with color style "danger" */}
                    <Button variant="danger" onClick={this.DeleteClub}>Delete</Button>
                </Card>
            </div>
        );
    }
}
export default ClubItem;