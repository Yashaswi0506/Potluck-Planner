import {Entity, Property, Unique, ManyToOne, PrimaryKey} from "@mikro-orm/core";
import {RenameLocation} from "ts-morph";
import { BaseEntity } from "./BaseEntity.js";
import { User } from "./User.js";
import type {Rel} from '@mikro-orm/core';



@Entity({ tableName: "events"})
export class Events extends BaseEntity{

    @ManyToOne()   //one user can create many events
    event_host!: Rel<User>; //event_host is going to be an user

    @ManyToOne() //one user can participate in many events
    event_user!: Rel<User>; //event_user is going to be an user

    @Property()
    event_name: string;

    @Property()
    isHost: string="false";

}
