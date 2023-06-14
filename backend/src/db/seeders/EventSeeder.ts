import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import {Events} from "../entities/event.js";


export class EventSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
	
		em.create(Events, {
			event_name: "Christmas",
			event_location: "Providence Park, Portland",
			event_date: "16th June 2023"
		});
		em.create(Events, {
			event_name: "Summer break",
			event_location: "Portland State University",
			event_date: "17th June 2023"
		});
		em.create(Events, {
			event_name: "Upcoming long Weekend",
			event_location: "Nobel Woods, Hillsboro",
			event_date: "18th July 2023"
		});
		
		
	}
}
