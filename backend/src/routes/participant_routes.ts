//This file conatins adding participants to the event, updating and reading rsvp status

import { FastifyInstance } from "fastify";
import { Notification } from "../db/entities/Notification.js";
import { Participants , RSVPStatus} from "../db/entities/Participant.js";
import { User, UserRole } from "../db/entities/User.js";
import {verifyToken} from "../plugins/verifyTokenConfig.js";
import {ICreateParticipantBody, IFindIsHost, IUpdateRSVP, IUpdateUsersBody} from "../types.js";
import { Events } from "../db/entities/event.js";
import {JwtPayload} from "jsonwebtoken";

export function ParticipantRoutesInit(app: FastifyInstance) {
	app.post<{ Body: ICreateParticipantBody }>("/participants", async (req, reply) => {
		const { id, participant_id } = req.body;

		try {
			// This is a pure convenience so we don't have to keep passing User to req.em.find
			
			const userRepository = req.em.getRepository(User);

			//Find our two user IDs, so we can link them into our new message
			
			const eventEntity = await req.em.findOne(Events,id);
			for (const participant of participant_id) {
				console.log(participant);
				//const participant_user = userRepository.find( {email:participant});
				const participantEntity = await req.em.findOne(User, {email:participant});
				const newParticipant = await req.em.create(Participants, {
					event: eventEntity,
					user: participantEntity,
				});
			}
			// Send our changes to the database
			await req.em.flush();

			// Let the user know everything went fine
			return reply.send("Guest added");
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});

	app.search("/participants", async (req, reply) => {
		const { event_id } = req.body;
		

		try {
			const participantEntity = req.em.getRepository(Participants);
			const userEntity = req.em.getRepository(User);

			const eventDetails = await participantEntity.find({ event_id }, { populate: ["user"] });
			//const participantDetails = await userEntity.find(User, {id:eventDetails.user});

			console.log(eventDetails);

			reply.send(eventDetails);
		} catch (err) {
			reply.status(500).send(err);
		}
	});
	
	app.search<{ Body: IFindIsHost }>("/participants/ishost", async (req, reply) => {
		const {id, participant_id} = req.body;
		
		try {
		
		
		 //const user_det =  await req.em.find(User, {id:participant_id});
			const participantDetails = await req.em.find(Participants, { event:id, user: participant_id});
			const host = participantDetails[0].is_host;
			reply.status(200).send(host);
			
		} catch (err) {
			reply.status(500).send(err);
		}
	}
	);
	
		
	

	
	app.put<{ Body: IUpdateRSVP}> ("/participants/rsvp", async (req, reply) => {
		const { id, participant_id, rsvp,uid } = req.body;
		
			try {
				//const participantEntity = req.em.getRepository(Participants);
				const participantDetails = await req.em.findOneOrFail(Participants, {event: id, user: participant_id});
				if (rsvp === "yes")
					participantDetails.RSVP_response = RSVPStatus.Accept;
				else if (rsvp === "no")
					participantDetails.RSVP_response = RSVPStatus.Reject;
				else
					participantDetails.RSVP_response = RSVPStatus.Pending;
				
				// Reminder -- this is how we persist our JS object changes to the database itself
				await req.em.flush();
				reply.status(200).send("RSVP Status updated");
			} catch (err) {
				reply.status(500).send(err);
			}
		
	});
}
