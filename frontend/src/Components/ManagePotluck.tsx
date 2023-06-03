//fetch the details of the potluck
//if the authenticated user is a host, the edit, delete and "add item" buttons should get displayed
//if the authenticated user is not a host, only potluck details should get displayed
//if the authenticated user is not a host, RSVP button should get displayed
//if the authenticated user is not a host, menu list added by the  host, should get displayed
//menu is a table with "item name", "item type", "item quantity", "claim" and "unclaim" columns.
//claim and unclaim columns  will contain a radio button




import {AuthenticatedUser, ProfileType} from "@/PotluckTypes.ts";
import {Route, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Login} from "@/Components/Login.tsx";
import {Col, Row} from "react-bootstrap";

export const ManagePotluck = () => {

    const [event, setEvent] = useState([]);
    const event_info = useLocation();
    const event_id = event_info.state.eventID;
    console.log("event id in manage :", event_id);


    useEffect(() => {
        const getEvent = async () => {
            const eventsRes = await axios({
                method: 'search',
                url: "http://localhost:8080/events/one",
                headers: {"Access-Control-Allow-Origin": "*"},
                data: {
                    event_id : event_id
                }
            });
            return eventsRes.data;
        };
        getEvent().then(setEvent);

    }, [1]);
        console.log("event data :", event);

    const navigate = useNavigate();

    const onAddItemPotluck = () =>{
        //fields to add food item should get displayed.
        //on saving the details a row of that food item details should get displayed


    };


    return (
        <div>
           <div>
                <h2>Potluck Details:</h2>
                <table border={1}>
                    <tbody>
                    <tr>
                        <th>Event Name</th>
                        <th>Event Location</th>
                        <th>Event Date</th>
                    </tr>
                    {event ?
                        event.map((event: { id: number, event_name: string; event_location: string, event_date: string}) => (
                            <tr key={event.id}>
                                <th>{event.event_name}</th>
                                <th>{event.event_location}</th>
                                <th>{event.event_date}</th>
                            </tr>
                        ))
                        : "Not found"}
                    </tbody>
                </table>
               <button className="btn btn-primary btn-circle" onClick={onAddItemPotluck}>Edit</button>
            </div>
        </div>

    );
};

//<th><button className="btn btn-primary btn-circle" onClick={onEditPotluck}>Edit</button></th>
//<th><button className="btn btn-primary btn-circle" onClick={onDeletePotluck}>Delete</button></th>


