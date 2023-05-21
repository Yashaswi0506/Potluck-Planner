import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {Participants} from "../db/entities/Participant.js";
import { User, UserRole } from "../db/entities/User.js";
import { ICreateEventBody } from "../types.js";
import { Events} from "../db/entities/event.js";
import { SOFT_DELETABLE_FILTER } from "mikro-orm-soft-delete";



export function EventRoutesInit(app: FastifyInstance) {
	//Create an event
	
	// CRUD
	// C
	app.post<{Body: ICreateEventBody}>("/events", async (req, reply) => {
		const { event_name, event_location, event_date} = req.body;
		
		try {
			const newEvent = await req.em.create(Events, {
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
	});
	
	
	//Search all the events I hosted
	//READ
	app.search("/events", async (req, reply) => {
		const { email } = req.body;
		try {
			//find user with given email id
			const host_user = await req.em.findOne(User, {email});
			
			if (!host_user) {
				// If user with the given email doesn't exist, return an appropriate response
				reply.status(404).send("User not found");
				return;
			}
			
			//get user_id of that user
			const host_id = host_user.id;
			
			//find the participant with that user_id
			const host_participant = await req.em.findOne(Participants, {host_id});
			
			if(host_participant.is_host === false)
			{
				reply.status(404).send("You are not a host");
				return;
			}
			
			if (!host_participant) {
				// If the participant for the host user doesn't exist, return an appropriate response
				reply.status(404).send("Participant not found");
				return;
			}
			
			//find all event_id of that participant
			const host_event_id = await  req.em.find(Participants, {host_participant});
			
			//find events corresponding to all the event id
			const theEvent = await req.em.find(Events, {host_event_id});
			console.log(theEvent);
			reply.send(theEvent);
		} catch (err) {
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
