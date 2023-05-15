import type {EntityManager} from '@mikro-orm/core';
import {Seeder} from '@mikro-orm/seeder';
import {User, UserRole} from "../entities/User.js";

export class UserSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		em.create(User, {
			name: "Spot",
			email: "email@email.com",
			role: UserRole.ADMIN
		});

		em.create(User, {
			name: "Dogbert",
			email: "email2@email.com",
			role: UserRole.ADMIN
		});

		em.create(User, {
			name: "Doglord",
			email: "email3@email.com",
			role: UserRole.USER
		});

		em.create(User, {
			name: "NotaDog",
			email: "email4@email.com",
			role: UserRole.USER
		});
	}
}
