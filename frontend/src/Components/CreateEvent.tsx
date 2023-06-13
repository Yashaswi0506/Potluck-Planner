import { useUserAuth } from "@/Context/AuthContext.tsx";
import { AddParticipantService } from "@/Services/AddParticipantsService.tsx";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "@/Components/Modal.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { SendInvitationService } from "@/Services/SendInvitationService.tsx";
import { FindhostStatus } from "@/Services/FindhostStatus.tsx";

//import { AuthenticatedUser, Message } from "@/PotluckTypes.ts";

export const CreateEvent = () => {
  const [event_name, setEventName] = useState("");
  const [event_location, setEventLocation] = useState("");
  const [event_date, setEventDate] = useState("");
  const event_info = useLocation();
  const event_id = event_info.state.eventID;
  const [guestList, setguestList] = useState("");
  const [message, setMessage] = useState("");
  //console.log("user id in frontend :", AuthenticatedUser.id);
  const auth = useUserAuth();
  const userId = auth.user.uid;
  const [event_created, setEventCreation] = useState("false");
  const [openModal, setModal] = useState(false);
  const user_id = auth.user.uid;
  const [ishost, sethost] = useState("false");

  useEffect(() => {
    sethost("false");
    if (event_id != null) {
      const getEvent = async () => {
        const eventsRes = await axios({
          method: "search",
          url: "http://localhost:8080/events/one",
          headers: { "Access-Control-Allow-Origin": "*" },
          data: {
            event_id: event_id,
          },
        });
        return eventsRes.data[0];
      };

      getEvent().then((value) => {
        setEventName(value.event_name);
        setEventLocation(value.event_location);
        setEventDate(value.event_date);

        if (auth.user.uid != null) {
          FindhostStatus.send(event_id, auth.user.uid).then((response) => {
            sethost(response.data);
          });
        }
      });
    }
  }, []);

  const onSaveEventButtonclick = () => {
    const create_event_req = async () => {
      const result = await axios({
        method: "post",
        url: "http://localhost:8080/events",
        headers: { "Access-Control-Allow-Origin": "*" },
        data: {
          event_id: event_id,
          user_id: userId,
          event_name,
          event_location,
          event_date,
        },
      });

      return result.status;
    };

    create_event_req().then((value) => {
      if (value === 200) {
        console.log("created an event");
        setEventCreation("true");
      } else {
        console.log("event not created");
      }
    });

    navigate("/after_login");
  };

  const navigate = useNavigate();

  const onCancelEventButtonclick = () => {
    setEventName("");
    setEventLocation("");
    setEventDate("");
    console.log("EVENT NOT CREATED");
  };

  function onMessageSendButton() {
    const message = `It's a Potluck Party! ${event_name} is organized at ${event_location} on ${event_date}. Please RSVP `;
    console.log(message);
    console.log(guestList);
    const guestArray_edit = guestList.split(",");
    const guestArray = guestArray_edit.map((str) => str.replace(/\s/g, ""));
    console.log("guestArray", guestArray);
    const response = AddParticipantService.send(event_id, guestArray);
    console.log(response);
    const response1 = SendInvitationService.send(
      event_id,
      user_id,
      guestArray,
      message
    );
    console.log(response1);
  }

  return (
    <>
      <div>
        <div className="flex flex-col items-center bg-slate-700 w-4/5 mx-auto p-5 rounded-box">
          <h2 className="text-4xl text-blue-600 mb-5">
            {event_id ? "Edit Event:" : "Create Event:"}
          </h2>

          <div className="flex flex-col w-full mb-5">
            <label htmlFor="name" className="text-blue-300 mb-2">
              Event Name:
            </label>
            <input
              placeholder="Name..."
              type="text"
              id="name"
              required
              value={event_name}
              onChange={(e) => setEventName(e.target.value)}
              name="name"
              className="input input-bordered"
            />
          </div>

          <div className="flex flex-col w-full mb-5">
            <label htmlFor="loc" className="text-blue-300 mb-2">
              Event Location:
            </label>
            <input
              placeholder="location..."
              type="text"
              id="loc"
              required
              value={event_location}
              onChange={(e) => setEventLocation(e.target.value)}
              name="loc"
              className="input input-bordered"
            />
          </div>

          <div className="flex flex-col w-full mb-5">
            <label htmlFor="date" className="text-blue-300 mb-2">
              Event Date:
            </label>
            <input
              placeholder="date..."
              type="text"
              id="date"
              required
              value={event_date}
              onChange={(e) => setEventDate(e.target.value)}
              name="date"
              className="input input-bordered"
            />
          </div>

          {event_name != null &&
            event_location != null &&
            event_date != null && (
              <div>
                <button
                  className="btn btn-primary btn-circle"
                  onClick={onSaveEventButtonclick}
                >
                  Save
                </button>
                <button
                  className="btn btn-primary btn-circle"
                  onClick={onCancelEventButtonclick}
                >
                  Cancel
                </button>
              </div>
            )}
        </div>
        {event_id != null && ishost != "false" && (
          <div>
            <h2>Invite Guest</h2>
            <textarea
              id="guestList"
              name="guestList"
              placeholder="Enter Guest Email"
              required
              value={guestList}
              onChange={(e) => setguestList(e.target.value)}
            />
            <button type="submit" value="submit" onClick={onMessageSendButton}>
              Send Invite
            </button>
          </div>
        )}
        <div className="flex flex-col">
          <button
            className="openModalBtn"
            onClick={() => {
              setModal(true);
            }}
          >
            Guest List
          </button>
          {openModal && <Modal event_id={event_id} closeModal={setModal} />}
        </div>
      </div>
    </>
  );
};
