import {
	Entity,
	Property,
	ManyToOne, Ref
} from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";
import {Events} from "./event.js";
import {Participants} from "./Participant.js";
import type {Rel} from '@mikro-orm/core';
import {User} from "./User.js";



@Entity({ tableName: "fooditems"})
export class FoodItems extends BaseEntity {
	
	//@Property()
	//claim:  Rel<Participants>; = null;
	//
	
	//many food item can be in one event
	@ManyToOne()
	event!: Rel<Events>;
	
	//many food items can be brought by one user
	@ManyToOne({nullable: true})
	claim: Rel<User>;
	
	
	@Property()
	item_name: string;
	
	@Property()
	item_type: string;
	
	@Property()
	item_quantity: string;
	
	
	
}
