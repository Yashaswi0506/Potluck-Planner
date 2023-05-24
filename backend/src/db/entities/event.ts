import {Entity, Property, Unique, ManyToOne, PrimaryKey, OneToMany, Cascade, Collection} from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";
import {FoodItems} from "./FoodItem.js";
import {User} from "./User.js";
import {Participants} from "./Participant.js";
import {Notification} from "./Notification.js";

@Entity({ tableName: "events"})
export class Events extends BaseEntity {
	
	@Property()
	event_name: string;
	
	@Property()
	event_location: string;
	
	@Property()
	event_date: string;
	
	@OneToMany(
		() => Participants,
		participants => participants.event,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE]}
	)
	guest!: Collection<Participants>;
	
	@OneToMany(
		() => Notification,
		notification => notification.eventId,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE]}
	)
	eventDetails!: Collection<Notification>;
	
	
	@OneToMany(
		() => FoodItems,
		fooditem => fooditem.eventId,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE]}
	)
	eventMenu!: Collection<FoodItems>;
	
	
	
}
