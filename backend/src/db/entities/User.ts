import { Entity, Property, Unique, OneToMany, Collection, Cascade } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";
import {Events} from "./event.js";

@Entity({ tableName: "users"})
export class User extends BaseEntity {	
	@Property()
	@Unique()
	email!: string;
	
	@Property()
	name!: string;
	

	//code for event
	//one user can create many events
	@OneToMany(
		() => Events,  //which table we are linking to
		events => events.event_host  //which field on the table we are linking to
	)
	events_created!: Collection<Events>;

	//one user can be in many events
	@OneToMany(
		() => Events,  //which table we are linking to
		events => events.event_user  //which field on the table we are linking to
	)
	events_participated_in!: Collection<Events>;

}
