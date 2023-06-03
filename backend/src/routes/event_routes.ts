import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {Participants, RSVPStatus} from "../db/entities/Participant.js";
import { User, UserRole } from "../db/entities/User.js";
import { ICreateEventBody } from "../types.js";
import { Events} from "../db/entities/event.js";
import { SOFT_DELETABLE_FILTER } from "mikro-orm-soft-delete";



export function EventRoutesInit(app: FastifyInstance) {
	//Create an event
	
	// CRUD
	// C
	app.post<{Body: ICreateEventBody}>("/events", async (req, reply) => {
		const { user_id, event_name, event_location, event_date} = req.body;



		let newEvent;
		try {
			    newEvent = await req.em.create(Events, {
				event_name,
				event_location,
				event_date
			});
			
			await req.em.flush();
			
			console.log("Created new event:", newEvent);
			return reply.send(newEvent);
		} catch (err) {
			console.log("Failed to create new event", err.message);
			return reply.status(500).send({message: err.message});
		}
		finally {

			if(newEvent){
				console.log("user id in finally  :", user_id);
				const newParticipant
					= await req.em.create(Participants, {
						user:user_id,
					    event:newEvent.id,
					    is_host:"true",
					    RSVP_response:RSVPStatus.Accept
				})

				await req.em.flush();
				console.log("ceated participant entry  :", newParticipant);
 			}

		}


	});
	
	
	//Search all the events I hosted
	//READ
	app.search("/events/hosted", async (req, reply) => {
		const { email } = req.body;
		try {
			//find user with given email id
			const host_user = await req.em.findOne(User, {email});
			
			if (!host_user) {
				// If user with the given email doesn't exist, return an appropriate response
				reply.status(404).send("User not found");
				return;
			}
			console.log("User found %d", host_user.id);
			
			
			//find the participant with that user_id
			const hosted_event_list = await req.em.find(Participants, {user_id: host_user.id, is_host: 'true'});
			
			
			if (!hosted_event_list) {
				// If the participant for the host user doesn't exist, return an appropriate response
				reply.status(404).send("Participant not found");
				return;
			}
			const eventList = [];
			for (const entry of hosted_event_list) {
				const theEvent = await req.em.find(Events, {id:entry.event.id});
				eventList.push(theEvent);
			}
			//find events corresponding to all the event id
			
			console.log(eventList);
			reply.send(eventList);
		} catch (err) {
			console.error(err);
			reply.status(500).send(err);
		}
	});

	//Search all the events I attended
	//READ
	app.search("/events/attended", async (req, reply) => {
		const { email } = req.body;
		try {
			//find user with given email id
			const guest_user = await req.em.findOne(User, {email});
			
			if (!guest_user) {
				// If user with the given email doesn't exist, return an appropriate response
				reply.status(404).send("User not found");
				return;
			}
			console.log("User found %d", guest_user.id);
			
			
			//find the participant with that user_id
			const guest_event_list = await req.em.find(Participants, {user_id: guest_user.id});




			
			if (!guest_event_list) {
				// If the participant for the host user doesn't exist, return an appropriate response
				reply.status(404).send("Participant not found");
				return;
			}
			const eventList = [];
			for (const entry of guest_event_list) {
				if(entry.is_host == "true"){
					entry.is_host = "host";
				}
				else{
					entry.is_host = "guest";
				}
				const theEvent = await req.em.find(Events, {id:entry.event.id});
				eventList.push({
					id: theEvent[0].id,
					event_name: theEvent[0].event_name,
					event_location: theEvent[0].event_location,
					event_date: theEvent[0].event_date,
					is_host: entry.is_host,

				});
			}
			//find events corresponding to all the event id
			
			console.log(eventList);
			reply.send(eventList);
		} catch (err) {
			console.error(err);
			reply.status(500).send(err);
		}
	});
	
	
	//search a particular potluck
	app.search("/events/one", async (req, reply) => {
		const { event_id } = req.body;
		try {
			//find user with given email id
			const event = await req.em.find(Events, {id:event_id});

			if (!event) {
				// If user with the given email doesn't exist, return an appropriate response
				reply.status(404).send("event not found");
				return;
			}

			console.log("Event found");
			reply.send(event);

			}catch (err) {
			console.error(err);
			reply.status(500).send(err);
		}
	});

	
	//update an event
	// UPDATE
	app.put<{Body: {event_id, event_name:string, event_location:string, event_date:string}}>("/events", async(req, reply) => {
		const { event_name, event_location, event_date} = req.body;
		try {
			const id = req.body.event_id;
			
			const EventToUpdate = await req.em.findOne(Events, {id});
			
			EventToUpdate.event_name= event_name;
			EventToUpdate.event_location= event_location;
			EventToUpdate.event_date=event_date;
			
			// Reminder -- this is how we persist our JS object changes to the database itself
			await req.em.flush();
			console.log("Event updated");
			reply.send(EventToUpdate);
		}catch (err){
			console.error(err);
			reply.status(401).send(err);
		}
		
	});
	
	
	//Delete an event
	//only host can delete the event
	//Delete all events
}
