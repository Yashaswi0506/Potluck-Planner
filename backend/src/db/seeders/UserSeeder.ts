import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { User, UserRole } from "../entities/User.js";

export class UserSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		em.create(User, {
			name: "Shruti",
			id: "pyOrAgdJdIQTGzQ45AHdJYCCWBb2",
			email: "email@email.com",
			role: UserRole.ADMIN,
		});
		
		em.create(User, {
			id: "Bde16pM4HgfZNLLrHMcuXMjXwp43",
			name: "Dogbert",
			email: "email2@email.com",
			role: UserRole.ADMIN,
		});
		
		em.create(User, {
			id:"1I2BOnS9x7bgn1IcDCa8ZIQZohL2",
			name: "Doglord",
			email: "email3@email.com",
			role: UserRole.USER,
		});
		
		em.create(User, {
			id:"TOWoq68yaydi0zPAwlwl7p7T9TT2",
			name: "NotaDog",
			email: "email4@email.com",
			role: UserRole.USER,
		});
	}
}
