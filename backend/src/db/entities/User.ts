import { Entity, Property, Unique, OneToMany, Collection, Cascade } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";
import {Events} from "./event.js";
import { Enum } from "@mikro-orm/core";
import {FoodItems} from "./FoodItem.js";
import { Participants} from "./Participant.js";
import {Notification} from "./Notification.js";

export enum UserRole {
	ADMIN = 'Admin',
	USER = 'User'
}



@Entity({ tableName: "users"})
export class User {
	@Property({primary:true})
	@Unique()
	id!: string;
	
	@Property()
	@Unique()
	email!: string;
	
	@Property()
	name!: string;

	@Enum(() => UserRole)
	role!: UserRole;
	
	@Property()
	created_at = new Date();
	
	@Property({ onUpdate: () => new Date() })
	updated_at = new Date();
	
	@OneToMany(
		() => Participants,
		participants => participants.user,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE]}
	)
guest!: Collection<Participants>;
	
	@OneToMany(
		() => FoodItems,
		fooditem => fooditem.claim,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE]}
	)
	eventMenu!: Collection<FoodItems>;
	
	
	@OneToMany(
		() => Notification,
		notification => notification.host,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE]}
	)
	sent_by!: Collection<Notification>;
	
	@OneToMany(
		() => Notification,
		notification => notification.participant,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE]}
	)
	received_by!: Collection<Notification>;
	
	




	

	

	
}
