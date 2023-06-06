import { FastifyInstance } from "fastify";
import { Notification } from "../db/entities/Notification.js";
import { User, UserRole } from "../db/entities/User.js";
import { ICreateNotificationBody, IViewNotificationBody } from "../types.js";
import { Events } from "../db/entities/event.js";

export function NotificationRoutesInit(app: FastifyInstance) {
	// CREATE MATCH ROUTE
	/* Refactor - note our change to getReference!

	 getReference/getReference retrieves an entity by its primary key, but it does not actually fetch
	 the entity from the database until you attempt to access its properties. This is used when
	 you just need a reference to an entity in order to establish a relationship with another entity.
	 */
	app.post<{ Body: ICreateNotificationBody }>("/notifications", async (req, reply) => {
		const { host_id, event_id, participant_id, message } = req.body;

		try {
			// This is a pure convenience so we don't have to keep passing User to req.em.find
			const userRepository = req.em.getRepository(User);
			const eventRepository = req.em.getRepository(Events);

			//Find our two user IDs, so we can link them into our new message
			const hostEntity = await userRepository.getReference(host_id);
			const guestEntity = await userRepository.getReference(participant_id);
			const eventEntity = await eventRepository.getReference(event_id);

			// Create the new message
			const newMessage = await req.em.create(Notification, {
				host: hostEntity,
				eventId: eventEntity,
				participant: guestEntity,
				message,
			});
			// Send our changes to the database
			await req.em.flush();

			// Let the user know everything went fine
			return reply.send(newMessage);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});

	//View Notification
	app.search<{ Body: IViewNotificationBody }>("/notifications/view", async (req, reply) => {
		const { participant_id } = req.body;

		try {
			const receiverEntity = await req.em.getReference(User, participant_id);
			const messages = await req.em.find(Notification, { participant_id: receiverEntity });
			
			return reply.send(messages);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});
}
