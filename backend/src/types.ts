import {IntegerType} from "@mikro-orm/core";

export type ICreateUsersBody = {
	name: string,
	email: string,
	
}

export type ICreateEventBody = {
	user_id:number
	event_name: string,
	event_location: string,
	event_date:string
	event_id:number;
}

export type IUpdateUsersBody = {
	name: string,
	id: number,
	
}

export type ICreateNotificationBody = {
	host_id: number,
	event_id : number,
	participant_id: number,
	message: string
	
}

export type IViewNotificationBody = {
	participant_id: number
	
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

