import {Entity, Property, Unique, ManyToOne, PrimaryKey, OneToMany, Cascade, Collection, Ref} from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";
import {Events} from "./event.js";
import {User} from "./User.js";
import {Participants} from "./Participant.js";
import {Notification} from "./Notification.js";

@Entity({ tableName: "fooditems"})
export class FoodItems extends BaseEntity {
	
	//many food item can be in one event
	@ManyToOne()
	eventId!: Ref<Events>;
	
	//many food items can be brought by one user
	@ManyToOne()
	participantId!: Ref<Participants>;
	
	@Property()
	Item_name: string;
	
	@Property()
	Item_type: string;
	
	@Property()
	Item_quantity: string;
	
	
}
