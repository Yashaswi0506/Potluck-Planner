import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import {Events} from "../entities/event.js";
import {Notification} from "../entities/Notification.js";
import {User} from "../entities/User.js";


export class NotificationSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		
		const user_id_2 = await em.findOne(User, { email: "email@email.com" });
		const user_id_3 = await em.findOne(User, { email: "email2@email.com" });
		const user_id_4 = await em.findOne(User, { email: "email3@email.com" });
		const user_id_5 = await em.findOne(User, { email: "email4@email.com" });
		
		
	
		
		const event_id_3 = await  em.findOne(Events, {event_name:"potluck_3"});
		const event_id_4 = await  em.findOne(Events, {event_name:"potluck_4"});
	
		
	
		
		em.create(Notification, {
			eventId: event_id_3,
			host: user_id_3,
			participant : user_id_2,
			message: "You are invited for potluck 3"
			
		});
		
		em.create(Notification, {
			eventId: event_id_3,
			host: user_id_3,
			participant : user_id_4,
			message: "You are invited for potluck 3"
		});
		
		em.create(Notification, {
			eventId: event_id_4,
			host: user_id_4,
			participant : user_id_2,
			message: "You are invited for potluck 4"
		});
		
		em.create(Notification, {
			eventId: event_id_4,
			host: user_id_4,
			participant : user_id_3,
			message: "You are invited for potluck 4"
		});
		
		
	}
}
