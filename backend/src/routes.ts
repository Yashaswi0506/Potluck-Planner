import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {Participants} from "./db/entities/Participant.js";
import {User} from "./db/entities/User.js";
import {ICreateEventBody, ICreateUsersBody} from "./types.js";
import {Events} from "./db/entities/event.js";

async function DoggrRoutes(app: FastifyInstance, _options = {}) {
	if (!app) {
		throw new Error("Fastify instance has no value during routes construction");
	}
	
	app.get('/hello', async (request: FastifyRequest, reply: FastifyReply) => {
		return 'hello';
	});
	
	app.get("/dbTest", async (request: FastifyRequest, reply: FastifyReply) => {
		return request.em.find(User, {});
	});
	
	
	// CRUD
	// C
	app.post<{Body: ICreateUsersBody}>("/users", async (req, reply) => {
		const { name, email} = req.body;
		
		try {
			const newUser = await req.em.create(User, {
				name,
				email
			});

			await req.em.flush();
			
			console.log("Created new user:", newUser);
			return reply.send(newUser);
		} catch (err) {
			console.log("Failed to create new user", err.message);
			return reply.status(500).send({message: err.message});
		}
	});
	
	
	//READ
	app.search("/users", async (req, reply) => {
		const { email } = req.body;
		
		try {
			const theUser = await req.em.findOne(User, { email });
			console.log(theUser);
			reply.send(theUser);
		} catch (err) {
			console.error(err);
			reply.status(500).send(err);
		}
	});
	
	
	// UPDATE
	app.put<{Body: ICreateUsersBody}>("/users", async(req, reply) => {
		const { name, email} = req.body;
		
		const userToChange = await req.em.findOne(User, {email});
		userToChange.name = name;

		// Reminder -- this is how we persist our JS object changes to the database itself
		await req.em.flush();
		console.log(userToChange);
		reply.send(userToChange);
		
	});
	
	
	// DELETE
	app.delete<{ Body: {email}}>("/users", async(req, reply) => {
		const { email } = req.body;
		
		try {
			const theUser = await req.em.findOne(User, { email });
			
			await req.em.remove(theUser).flush();
			console.log(theUser);
			reply.send(theUser);
		} catch (err) {
			console.error(err);
			reply.status(500).send(err);
		}
	});


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
	})
	
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
	
	//add parti
	//delete
	//read
	
	


}

export default DoggrRoutes;
