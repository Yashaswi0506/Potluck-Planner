import {Entity, Property, Unique, ManyToOne, PrimaryKey} from "@mikro-orm/core";
import {RenameLocation} from "ts-morph";
import { BaseEntity } from "./BaseEntity.js";
import {User} from "./User.js";



@Entity({ tableName: "events"})
export class Events extends BaseEntity {
    
    @Property()
    event_name: string;
    
    @Property()
    event_location: string;
    
    @Property()
    event_date: string;
    
   
}
