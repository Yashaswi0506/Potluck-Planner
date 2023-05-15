import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import {User} from "../entities/User.js";

export class UserSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		em.create(User, {
			name: "Spot",
			email: "email1@email.com",
		});
		
		em.create(User, {
			name: "Dogbert",
			email: "email12@email.com",
		});
		
		em.create(User, {
			name: "Doglord",
			email: "email13@email.com"
		});
		
		em.create(User, {
			name: "NotaDog",
			email: "email14@email.com"
		});
	}
}
