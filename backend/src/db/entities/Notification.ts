import { Entity, Property, ManyToOne, Cascade } from "@mikro-orm/core";
// Control + click these imports to view their actual code/type
// Also see identity functions here - https://betterprogramming.pub/typescript-generics-90be93d8c292
import type {Ref, Rel} from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";
import { User } from "./User.js";

@Entity()
export class Notification extends BaseEntity {
	
	// The person who performed the match/swiped right
	@ManyToOne()
	host!: Ref<User>;
	
	// The account whose profile was swiped-right-on
	@ManyToOne('User')
	participant!: Rel<User>;
	
	@Property()
	message!: string;
}
