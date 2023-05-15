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
	


}
