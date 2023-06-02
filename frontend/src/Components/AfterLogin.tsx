
//the is a page which will get displayed after user logs in
//the page will have "Create Potluck" button, along with applicaiton info
//"My potlucks" heading with two buttons "Potluck I can manage" and "Potluck that I am attending"


import {AuthenticatedUser, ProfileType} from "@/PotluckTypes.ts";
import {Route, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Login} from "@/Components/Login.tsx";
import {Col, Row} from "react-bootstrap";

export const AfterLogin = () => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const eventsRes = await axios({
            method: 'search',
            url: "http://localhost:8080/events/attended",
            headers: {"Access-Control-Allow-Origin": "*"},
            data: {
                email: AuthenticatedUser.email
            }
            });
            return eventsRes.data;
        };

        getUsers().then(setEvents);
    }, []);


    const navigate = useNavigate();

    const onCreateEventButtonClickk = () => {
        navigate("/events");
    };

    return (
        <div>
            <div>
                <button className="btn btn-primary btn-circle" onClick={onCreateEventButtonClickk}>Create</button>
            </div>
            <div>
                <h2>My Potlucks:</h2>
                <table border={1}>
                    {events ?
                            events.map((event: { id: number, event_name: string; event_location: string, event_date: string, is_host: string}) => (
                                <tr key={event.id}>
                                    <th>{event.event_name}</th>
                                    <th>{event.event_location}</th>
                                    <th>{event.event_date}</th>
                                    <th>{event.is_host}</th>
                                </tr>
                            ))
                     : "Not found"}
                </table>
            </div>
        </div>

    );
};
