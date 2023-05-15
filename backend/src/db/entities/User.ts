import { Entity, Property, Unique, OneToMany, Collection, Cascade } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";
import { Notification } from "./Notification.js";
import { Enum } from "@mikro-orm/core";

export enum UserRole {
	ADMIN = 'Admin',
	USER = 'User'
}


@Entity({ tableName: "users"})
export class User extends BaseEntity {	
	@Property()
	@Unique()
	email!: string;
	
	@Property()
	name!: string;
	
	@Enum(() => UserRole)
	role!: UserRole; // string enum
	
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
