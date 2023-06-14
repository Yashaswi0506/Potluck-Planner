import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import {Events} from "../entities/event.js";
import {Notification} from "../entities/Notification.js";
import {User} from "../entities/User.js";


export class NotificationSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		
		const user_id_1 = await em.findOne(User, { email: "email1@email.com" });
		const user_id_2 = await em.findOne(User, { email: "email2@email.com" });
		const user_id_3 = await em.findOne(User, { email: "email3@email.com" });
		const user_id_4 = await em.findOne(User, { email: "email4@email.com" });
		const user_id_5 = await em.findOne(User, { email: "email5@email.com" });
		
		
	
		
		const event_id_1 = await  em.findOne(Events, {id:1});
		const event_id_2 = await  em.findOne(Events, {id:2});
		const event_id_3 = await  em.findOne(Events, {id:3});
	
		
	
		
		em.create(Notification, {
			eventId: event_id_1,
			host: user_id_2,
			participant : user_id_1,
			message: "It's a Potluck Party! Christmas event is organized at Providence Park , Portland on 25 June 2023. Please RSVP "
			
		});
		
		em.create(Notification, {
			eventId: event_id_1,
			host: user_id_2,
			participant : user_id_3,
			message: "It's a Potluck Party! Christmas event is organized at Providence Park , Portland on 25 June 2023. Please RSVP "
		});
		
		em.create(Notification, {
			eventId: event_id_2,
			host: user_id_1,
			participant : user_id_3,
			message: "It's a Potluck Party! Spring Break 2023 event is organized at Portland State University on 15 July 2024. Please RSVP "
		});
		
		em.create(Notification, {
			eventId: event_id_2,
			host: user_id_1,
			participant : user_id_4,
			message: "It's a Potluck Party! Spring Break 2023 event is organized at Portland State University on 15 July 2024. Please RSVP "
		});
		
		em.create(Notification, {
			eventId: event_id_3,
			host: user_id_5,
			participant : user_id_1,
			message: "It's a Potluck Party! Upcoming long weekened event is organized at Noble Woods, Hillsboro, Oregon on 17 June 2023. Please RSVP "
			
		});
		
		em.create(Notification, {
			eventId: event_id_3,
			host: user_id_5,
			participant : user_id_2,
			message: "It's a Potluck Party! Upcoming long weekened event is organized at Noble Woods, Hillsboro, Oregon on 17 June 2023. Please RSVP "
		});
		
		em.create(Notification, {
			eventId: event_id_3,
			host: user_id_5,
			participant : user_id_3,
			message: "It's a Potluck Party! Upcoming long weekened event is organized at Noble Woods, Hillsboro, Oregon on 17 June 2023. Please RSVP "
		});
		
		em.create(Notification, {
			eventId: event_id_3,
			host: user_id_5,
			participant : user_id_4,
			message: "It's a Potluck Party! Upcoming long weekened event is organized at Noble Woods, Hillsboro, Oregon on 17 June 2023. Please RSVP "
		});
		
		
	}
}
