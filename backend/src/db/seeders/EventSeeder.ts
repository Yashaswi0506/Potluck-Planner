import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import {Events} from "../entities/event.js";


export class EventSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		em.create(Events, {
			event_name: "potluck_1",
			event_location: "location_1",
			event_date: "15th May 2023"
		});
		em.create(Events, {
			event_name: "potluck_2",
			event_location: "location_2",
			event_date: "16th May 2023"
		});
		em.create(Events, {
			event_name: "potluck_3",
			event_location: "location_3",
			event_date: "17th May 2023"
		});
		em.create(Events, {
			event_name: "potluck_4",
			event_location: "location_4",
			event_date: "18th May 2023"
		});
		
		
	}
}
