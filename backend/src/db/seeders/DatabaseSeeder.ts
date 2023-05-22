import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { EventSeeder } from "./EventSeeder.js";
import { UserSeeder } from "./UserSeeder.js";

export class DatabaseSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		return this.call(em, [UserSeeder, EventSeeder]);
	}
}
