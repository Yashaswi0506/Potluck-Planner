import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { User, UserRole } from "../entities/User.js";

export class UserSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		em.create(User, {
			name: "Shruti",
			id: "bphB9KtTf4RuD4UZUuxxykSpEY02",
			email: "email1@email.com",
			role: UserRole.ADMIN,
		});
		
		em.create(User, {
			id: "6Ym8xAYeUfYlOwK6G16NznkEERa2",
			name: "Yashaswi",
			email: "email2@email.com",
			role: UserRole.ADMIN,
		});
		
		em.create(User, {
			id:"LNDRgqABcvNyR9xso71YdewOvZw1",
			name: "Spot",
			email: "email3@email.com",
			role: UserRole.USER,
		});
		
		em.create(User, {
			id:"GFqF4o2LJJNPG2H356Ja0nxSfRW2",
			name: "Rachel",
			email: "email4@email.com",
			role: UserRole.USER,
		});
		
		em.create(User, {
			id:"TY3Wyo1VNuc4GoxTx2Nv0NUKXUi2",
			name: "Ben",
			email: "email5@email.com",
			role: UserRole.USER,
		});
	}
}
