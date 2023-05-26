import {
	Entity,
	ManyToOne,
	ManyToMany, OneToMany, Collection, Unique, Property, Cascade, Ref
} from "@mikro-orm/core";
import {RenameLocation} from "ts-morph";
import { BaseEntity } from "./BaseEntity.js";
import {Events} from "./event.js";
import {FoodItems} from "./FoodItem.js";
import {User} from "./User.js";
import type {Rel} from '@mikro-orm/core';

export enum RSVPStatus {
	Accept = 'yes',
	Reject = 'no',
	Pending = 'maybe'
}

@Entity({ tableName: "participant"})
export class Participants  {
	
	//each host is associated with a single user
	@ManyToOne({ primary: true })
	user: Rel<User>;
	
	@ManyToOne({ primary: true })
	event: Rel<Events>;
	
	
	
	@Property()
	is_host:string = "false";
	
	@Property()
	RSVP_response = RSVPStatus.Pending;
	


}
