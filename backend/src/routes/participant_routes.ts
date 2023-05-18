import { FastifyInstance } from "fastify";
import { Notification } from "../db/entities/Notification.js";
import {Participants} from "../db/entities/Participant.js";
import {User, UserRole} from "../db/entities/User.js";
import {ICreateParticipantBody } from "../types.js";
import {Events} from "../db/entities/event.js";

export function ParticipantRoutesInit(app: FastifyInstance) {
	
	app.post<{ Body: ICreateParticipantBody  }>("/participants", async (req, reply) => {
		const { id , participant_id  } = req.body;
		
		try {
			// This is a pure convenience so we don't have to keep passing User to req.em.find
			const eventRepository = req.em.getRepository(Events);
			const userRepository = req.em.getRepository(User);
			
			//Find our two user IDs, so we can link them into our new message
			const eventEntity = await eventRepository.getReference(id);
			const participantEntity = await userRepository.getReference(participant_id);
			
			// Create the new message
			const newParticipant = await req.em.create(Participants, {
				event: eventEntity,
				user: participantEntity,
				
			});
			// Send our changes to the database
			await req.em.flush();
			
			// Let the user know everything went fine
			return reply.send(newParticipant);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});
	
	app.search("/participants", async (req, reply) => {
		const { event_id } = req.body;
		
		try {
			const participantEntity = req.em.getRepository(Participants);
			const userEntity = req.em.getRepository(User);
			
			const eventDetails= await participantEntity.find({event_id},{populate:['user']});
			//const participantDetails = await userEntity.find(User, {id:eventDetails.user});
			
			console.log(eventDetails);
			
			
			
			
			
			reply.send(eventDetails);
		} catch (err) {
			reply.status(500).send(err);
		}
	});
}
