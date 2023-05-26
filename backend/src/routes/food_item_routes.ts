import { FastifyInstance } from "fastify";
import {FoodItems} from "../db/entities/FoodItem.js";
import {Participants} from "../db/entities/Participant.js";
import {ICreateFoodItemBody} from "../types.js";


export function FoodItemRoutesInit(app: FastifyInstance) {
	
	//add new item
	app.post<{ Body: ICreateFoodItemBody }>("/items", async (req, reply) => {
		const {event,item_name, item_type, item_quantity} = req.body;
		
		try {
			const newItem = await req.em.create(FoodItems, {event, item_name, item_type, item_quantity});
			
			await req.em.flush();
			return reply.send(newItem);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});
	
	
	//View all the items added to the list
	//READ
	app.search("/items", async (req, reply) => {
		const { event_id } = req.body;
		
		try {
			const item_list = await req.em.find(FoodItems, {event:event_id});
			reply.send(item_list);
		} catch (err) {
			reply.status(500).send(err);
		}
	});
	
	
	//edit item from the list
	// UPDATE
	app.put<{Body: {item_id, item_name:string, item_type:string, item_quantity:string, participant_id:number}}>
	("/items", async(req
									 , reply) => {
		const { item_id, item_name, item_type, item_quantity, participant_id} = req.body;
		try {
			const itemToUpdate = await req.em.findOne(FoodItems, {id:item_id});
			if (!itemToUpdate) {
				reply.status(404).send({ message:"Item not found" });
			}
			
			const host = await req.em.findOne(Participants, {event:itemToUpdate.event, is_host:"true"});
			console.log("host :", host);
			
			const participant = await req.em.findOne(Participants, {event:itemToUpdate.event, user: participant_id});
			console.log("participant in update :", participant);
			
			
			if (host.user.id != participant_id && participant.user != itemToUpdate.claim) {
				reply.status(403).send( {message:"You are not authorized to edit this item"});
			}
			
			
			itemToUpdate.item_name= item_name;
			itemToUpdate.item_type= item_type;
			itemToUpdate.item_quantity=item_quantity;
			
			// Reminder -- this is how we persist our JS object changes to the database itself
			await req.em.flush();
			console.log("Menu updated");
			reply.send(itemToUpdate);
		}catch (err){
			console.error(err);
			reply.status(401).send(err);
		}
		
	});
	
	
	// Route for claiming a food item
	app.put<{Body: { itemId: number, participantId: number, eventId:number } }>("/items/claim", async (req, reply) => {
		const { itemId } = req.body;
		const { participantId } = req.body;
		const { eventId } = req.body;
		
		try {
			const foodItem = await req.em.findOne(FoodItems, {id:itemId});
			if (!foodItem) {
				return reply.status(404).send({ message: "Food item not found" });
			}
			console.log("event_id: ", eventId, ", ParticipantId: ", participantId);
			const participant = await req.em.findOne(Participants, {event:eventId, user:participantId});
			console.log("Participant: ", participant);
			if (!participant) {
				return reply.status(404).send({message: "User is not found in the event participants"});
			}
			foodItem.claim = participant.user;
			await req.em.flush();
			
			return reply.send({ message: "Food item claimed successfully" });
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});
	
	
	//remove item from the list
	//delete complete menu

}
