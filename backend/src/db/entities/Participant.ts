import {
	Entity,
	ManyToOne,
	ManyToMany, OneToMany, Collection, Unique, Property
} from "@mikro-orm/core";
import {RenameLocation} from "ts-morph";
import { BaseEntity } from "./BaseEntity.js";
import {Events} from "./event.js";
import {User} from "./User.js";
import type {Rel} from '@mikro-orm/core';

@Entity({ tableName: "participant"})
export class Participants extends BaseEntity {
	
	//each host is associated with a single user
	@ManyToOne(() => User)
	user: Rel<User>;
	
	@ManyToOne(() => Events)
	event: Rel<Events>;
	
	@Property()
	is_host:string = "false";
	
	@Property()
	RSVP_response:string;
	
	
	
}
