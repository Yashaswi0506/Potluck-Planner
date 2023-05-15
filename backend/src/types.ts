export type ICreateUsersBody = {
	name: string,
	email: string,
	
}
export type IUpdateUsersBody = {
	name: string,
	id: number,
	
}

export type ICreateNotificationBody = {
	host_id: number,
	participant_id: number,
	message: string
	
}

export type IViewNotificationBody = {
	participant_id: number
	
}
