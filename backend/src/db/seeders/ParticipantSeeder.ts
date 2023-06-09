import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import {Events} from "../entities/event.js";
import {Participants} from "../entities/Participant.js";
import {User} from "../entities/User.js";


export class ParticipantSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		
		const user_id_1 = await em.findOne(User, { email: "email1@email.com" });
		const user_id_2 = await em.findOne(User, { email: "email2@email.com" });
		const user_id_3 = await em.findOne(User, { email: "email3@email.com" });
		const user_id_4 = await em.findOne(User, { email: "email4@email.com" });
		const user_id_5 = await em.findOne(User, { email: "email5@email.com" });
		
		
	
		const event_id_1 = await  em.findOne(Events, {id:1});
		const event_id_2 = await  em.findOne(Events, {id:2});
		const event_id_3 = await  em.findOne(Events, {id:3});
		
		
	
		
		em.create(Participants, {
			is_host:"true",
			user:user_id_2.id,
			event:event_id_1.id
		});
		
		em.create(Participants, {
			is_host:"false",
			user:user_id_1.id,
			event:event_id_1.id
		});
		em.create(Participants, {
			is_host:"false",
			user:user_id_3.id,
			event:event_id_1.id
		});
		
		em.create(Participants, {
			is_host:"true",
			user:user_id_1.id,
			event:event_id_2.id
		});
		
		em.create(Participants, {
			is_host:"false",
			user:user_id_4.id,
			event:event_id_2.id
		});
		
		em.create(Participants, {
			is_host:"false",
			user:user_id_5.id,
			event:event_id_2.id
		});
		
		em.create(Participants, {
			is_host:"true",
			user:user_id_5.id,
			event:event_id_3.id
		});
		
		em.create(Participants, {
			is_host:"false",
			user:user_id_1.id,
			event:event_id_3.id
		});
		
		em.create(Participants, {
			is_host:"false",
			user:user_id_2.id,
			event:event_id_3.id
		});
		
		em.create(Participants, {
			is_host:"false",
			user:user_id_3.id,
			event:event_id_3.id
		});
		
		em.create(Participants, {
			is_host:"false",
			user:user_id_4.id,
			event:event_id_3.id
		});
		
		
	}
}
