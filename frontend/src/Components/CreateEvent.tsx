import { httpClient } from "@/Services/HttpClient.tsx";
import { useState } from "react";

export enum SubmissionStatus {
    NotSubmitted,
    SubmitFailed,
    SubmitSucceeded
}

export const CreateProfile = () => {


    const [event_name, setName] = useState("");
    const [event_location, setEmail] = useState("");
    const [event_date, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(SubmissionStatus.NotSubmitted);



    const onSaveEventButtonclick = (ev) => {
        const formData = new FormData();

        formData.append("name", event_name);
        formData.append('email', event_location);
        formData.append("password", event_date);



               const config = {
            headers: {
                'content-type': 'multipart/form-data',
            }
        };

        httpClient.post("/users", formData, config)
            .then( (response) => {
                console.log("Got response from uploading file", response.status);
                if (response.status === 200) {
                    setSubmitted(SubmissionStatus.SubmitSucceeded);
                } else {
                    setSubmitted(SubmissionStatus.SubmitFailed);
                }
            });
    };

    return (
        <div className="flex flex-col items-center bg-slate-700 w-4/5 mx-auto p-5 rounded-box">
            <h2 className="text-4xl text-blue-600 mb-5">Create Event:</h2>
            {
                submitted === SubmissionStatus.SubmitFailed &&
                <h3 className="text-red-500">CREATING EVENT FAILED!</h3>
            }

            <div className="flex flex-col w-full mb-5">
                <label htmlFor="name" className="text-blue-300 mb-2">Event Name:</label>
                <input
                    placeholder="Name..."
                    type="text"
                    id="name"
                    required
                    value={event_name}
                    onChange={e => setName(e.target.value)}
                    name="name"
                    className="input input-bordered"
                />
            </div>


            <div className="flex flex-col w-full mb-5">
                <label htmlFor="email" className="text-blue-300 mb-2">Event Location:</label>
                <input
                    placeholder="email@email.com"
                    type="text"
                    id="email"
                    required
                    value={event_location}
                    onChange={e => setEmail(e.target.value)}
                    name="email"
                    className="input input-bordered"
                />
            </div>

            <div className="flex flex-col w-full mb-5">
                <label htmlFor="password" className="text-blue-300 mb-2">Event Date:</label>
                <input
                    placeholder="hunter2"
                    type="text"
                    id="password"
                    required
                    value={event_date}
                    onChange={e => setPassword(e.target.value)}
                    name="password"
                    className="input input-bordered"
                />
            </div>


            {
                event_name != null && event_location != null && event_date != null &&
                <div>
                    <button className="btn btn-primary btn-circle" onClick={onSaveEventButtonclick}>Create</button>
                </div>
            }
        </div>
    );

};
