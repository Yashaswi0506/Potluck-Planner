import { FastifyInstance } from "fastify";
import {FoodItems} from "../db/entities/FoodItem.js";
import {Participants} from "../db/entities/Participant.js";
import {ICreateFoodItemBody} from "../types.js";
import {User} from "../db/entities/User.js";


export function FoodItemRoutesInit(app: FastifyInstance) {
	
	//add new item
	app.post<{ Body: ICreateFoodItemBody }>("/items", async (req, reply) => {
		const {event,item_name, item_type, item_quantity} = req.body;


		let newItem;
		try {
			 newItem = await req.em.create(FoodItems, {event, item_name, item_type, item_quantity});
			
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
		let item_list
		try {
			 item_list = await req.em.find(FoodItems, {event:event_id});

		} catch (err) {
			reply.status(500).send(err);
		}
		const response =  []
		let item, claimingUser;
		for (item of item_list) {
			if (item.claim) {
				claimingUser = await req.em.findOne(User, {id:item.claim})
				response.push({
					id: item.id,
					item_name: item.item_name,
					item_type: item.item_type,
					item_quantity: item.item_quantity,
					claim: item.claim,
					user_name: claimingUser.name
				})
			} else {
				response.push({
					id: item.id,
					item_name: item.item_name,
					item_type: item.item_type,
					item_quantity: item.item_quantity,
					claim: item.claim,
					user_name: ""
				})
			}
		}
		reply.send(response);
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

			//unclaim
			if(foodItem.claim){
				foodItem.claim = null;
				await req.em.flush();

				return reply.send({message: "food item unclaimed"});
			}


			const participant = await req.em.findOne(Participants, {event:eventId, user:participantId});

			if (!participant) {
				return reply.status(404).send({message: "User is not found in the event participants"});
			}

			const userInfo = await req.em.findOne(User, {id: participant.user.id});
			console.log("user name  :", userInfo.name);


			foodItem.claim = participant.user;
			console.log("participant.user :", participant.user);
			await req.em.flush();
			
			return reply.send({ message: "Food item claimed successfully" });
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});
	
	
	//remove item from the list

	//Delete an item from menu
	app.delete<{ Body: { item_id: number; participant_id: number} }>("/items", async (req, reply) => {
		const { item_id, participant_id} = req.body;
		try {
			const itemToDelete = await req.em.findOne(FoodItems, {id:item_id});
			if (!itemToDelete) {
				reply.status(404).send({ message:"Item not found" });
			}

			const host = await req.em.findOne(Participants, {event:itemToDelete.event, is_host:"true"});
			console.log("host :", host);


			if (host.user.id != participant_id ) {
				reply.status(403).send( {message:"You are not authorized to edit this item"});
			}


			// Reminder -- this is how we persist our JS object changes to the database itself
			await req.em.remove(itemToDelete).flush();
			console.log("Item Deleted");
			reply.send(itemToDelete);

		}catch (err){
			console.error(err);
			reply.status(401).send(err);
		}


	});


	//delete complete menu
	app.delete<{ Body: { event_id: number; participant_id: number} }>("/items/all", async (req, reply) => {
		const {event_id, participant_id} = req.body;
		try {
			const  item_list = await req.em.find(FoodItems, {event:event_id});
			if (!item_list) {
				reply.status(404).send({ message:"Menu does not exist" });
			}

			const host = await req.em.findOne(Participants, {user:participant_id, is_host:"true"});
			console.log("host :", host);


			if (host.user.id != participant_id ) {
				reply.status(403).send( {message:"You are not authorized to the menu"});
			}


			// Reminder -- this is how we persist our JS object changes to the database itself
			await req.em.remove(item_list).flush();
			console.log("Item Deleted");
			reply.status(200);
		}catch (err){
			console.error(err);
			reply.status(401).send(err);
		}


	});


}
