import type {EntityManager} from '@mikro-orm/core';
import {Seeder} from '@mikro-orm/seeder';
import {FoodItems} from "../entities/FoodItem.js";


export class FoodItemSeederSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		em.create(FoodItems, {
			event: 1,
			item_name: "paneer chilly",
			item_type: "starter",
			item_quantity: "2oZ",
			claim: null
			
		});
		
		em.create(FoodItems, {
			event: 1,
			item_name: "Kaju curry",
			item_type: "main course",
			item_quantity: "3oZ",
			claim: null
		});
		
		em.create(FoodItems, {
			event: 1,
			item_name: "Jeera Rice",
			item_type: "main course",
			item_quantity: "1oZ",
			claim: null
		});
		
		em.create(FoodItems, {
			event: 2,
			item_name: "Manchurian",
			item_type: "starter",
			item_quantity: "2oZ",
			claim: null
		});
		
		em.create(FoodItems, {
			event: 2,
			item_name: "Hakka Noodles",
			item_type: "Main Course",
			item_quantity: "2oZ",
			claim: null
		});
		
		em.create(FoodItems, {
			event: 3,
			item_name: "Misal Pav",
			item_type: "Main course",
			item_quantity: "2oZ",
			claim: null
		});
		
		em.create(FoodItems, {
			event: 3,
			item_name: "Pasta",
			item_type: "Main course",
			item_quantity: "2oZ",
			claim: null
		});
		
		
	}
}
