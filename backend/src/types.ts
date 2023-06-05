import {IntegerType} from "@mikro-orm/core";

export type ICreateUsersBody = {
	id:string,
	name: string,
	email: string,
	password: string
}

export type ICreateEventBody = {
	event_name: string,
	event_location: string,
	event_date:string
}

export type IUpdateUsersBody = {
	name: string,
	id: string,
	
}

export type ICreateNotificationBody = {
	host_id: string,
	event_id : number,
	participant_id: string,
	message: string
	
}

export type IViewNotificationBody = {
	participant_id: string
	
}


export type ICreateParticipantBody = {
	id : number,
	participant_id : number
	
}


export type ICreateFoodItemBody = {
	event:number,
	item_name: string,
	item_type: string,
	item_quantity: string
}

