import {IntegerType} from "@mikro-orm/core";

export type ICreateUsersBody = {
	id:string,
	name: string,
	email: string,
	password: string
}

export type ICreateEventBody = {
	user_id:string
	event_name: string,
	event_location: string,
	event_date:string
	event_id:number;
	
}

export type IUpdateUsersBody = {
	name: string,
	id: string,
	
}

export type ICreateNotificationBody = {
	host_id: string,
	event_id : number,
	participant_id: Array<string>,
	message: string
	
}

export type IViewNotificationBody = {
	participant_id: string
	
}


export type ICreateParticipantBody = {
	id : number,
	participant_id : Array<string>
	
}


export type ICreateFoodItemBody = {
	event:number,
	item_name: string,
	item_type: string,
	item_quantity: string
}

export type IUpdateRSVP = {
	id : number,
	participant_id : string,
	rsvp:string,
	uid:string
	
}

export type IFindIsHost ={
	event:number,
	participant_id: string
}


