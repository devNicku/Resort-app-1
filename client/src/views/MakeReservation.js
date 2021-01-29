//NOTE: This page is intended for admins only. It is a developer tool.

import React, {useState} from 'react'
import axios from 'axios'
import { Link } from '@reach/router';

//Note: I am not including a category of "date" for the reservation yet because working with time might throw things off and I want to first make sure I can update a user and a room with the appropriate data.

//In the actual website, user_id should automatically come from session.
//Room should be selectable by name. On change, we can query the api for the corresponding ID to the name.


function MakeReservation(){
    const [user_id, setUser_Id] = useState('');
    const [room_id, setRoom_Id] = useState('');
    const [adult_rsvps, setAdult_Rsvps] = useState(0);
    const [child_rsvps, setChild_Rsvps] = useState(0);
    const [validationErrors, setValidationErrors] = useState([]);


    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8000/reservation/create',
            {user_id, room_id, adult_rsvps, child_rsvps})
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                const errorMessages = err.response.data.errors;
                const errorArray = [];
                for (const error in errorMessages) {
                    errorArray.push(errorMessages[error].message)
                }
                setValidationErrors(errorArray);
                console.log(err);
            })
    }

return(
    <>
        <div>
            <h1>Make a Reservation</h1>
            <Link to={"/"}>Back to Home</Link>
        </div>
        <h2>All fields are required.</h2>
        <div>
            <form onSubmit = {handleSubmit}>
                <label>User ID</label>
                <input
                    type = "String"
                    value = {user_id}
                    onChange = {event => setUser_Id(event.target.value)} 
                />
                <br></br>
                <label>Room ID</label>
                <input
                    type = "String"
                    value = {room_id}
                    onChange = {event => setRoom_Id(event.target.value)} 
                />
                <br></br>
                <label>Adult RSVPs</label>
                <input
                    type = "Number"
                    value = {adult_rsvps}
                    onChange = {event => setAdult_Rsvps(event.target.value)} 
                />
                <br></br>
                <label>Child RSVPs:</label>
                <input
                    type = "Number"
                    value = {child_rsvps}
                    onChange = {event => setChild_Rsvps(event.target.value)} 
                />
                <button>Make Reservation</button>
            </form>
        </div>
        <div>
            <ul>
            {validationErrors.map((error, index) =>
                <li key={index} style={{color:"red"}}>
                    {error}
                </li>
            )}
            </ul>
        </div>
    </>
)
}

export default MakeReservation;