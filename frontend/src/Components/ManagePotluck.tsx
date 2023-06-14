//fetch the details of the potluck
//if the authenticated user is a host, the edit, delete and "add item" buttons should get displayed
//if the authenticated user is not a host, only potluck details should get displayed
//if the authenticated user is not a host, RSVP button should get displayed
//if the authenticated user is not a host, menu list added by the  host, should get displayed
//menu is a table with "item name", "item type", "item quantity", "claim" and "unclaim" columns.
//claim and unclaim columns  will contain a radio button




import {useUserAuth} from "@/Context/AuthContext.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export const ManagePotluck = () => {
	
	const [event, setEvent] = useState([]);
	const [item_name, setItemName] = useState("");
	const [item_type, setItemType] = useState("");
	const [item_quantity, setItemQuantity] = useState("");
	const [fooditem, setMenu] = useState([]);
	const auth = useUserAuth();
	
	//Display specfic event details functionality
	const event_info = useLocation();
	const event_id = event_info.state.eventID;
	
	
	useEffect(() => {
		const getEvent = async () => {
			const eventsRes = await axios({
				method: 'search',
				url: "http://localhost:8080/events/one",
				headers: {"Access-Control-Allow-Origin": "*"},
				data: {
					event_id : event_id
				}
			});
			return eventsRes.data;
		};
		getEvent().then(setEvent);
		
	}, [1]);
	
	
	
	//Add item functionality
	const navigate = useNavigate();
	
	const onSaveItemButtonclick = () =>{
		const  add_item_req= async () => {
			const result = await axios({
				method: 'post',
				url: "http://localhost:8080/items",
				headers: {"Access-Control-Allow-Origin": "*"},
				data: {
					event:event_id, item_name, item_type, item_quantity
				}
				
			});
			
			return result.data;
		};
		
		add_item_req().then(value =>{
			if (value != null){
				console.log("item added to the menu");
				window.location.reload();
			}
			else{
				console.log("add item failed");
			}
		});
	};
	
	const onCancelItemButtonclick = () => {
		
		setItemName("");
		setItemType("");
		setItemQuantity("");
		console.log("Item not added");
		navigate("/after_login");
		
	};
	
	
	//Display item list of a potluck:
	useEffect(() => {
		const getMenu = async () => {
			const MenuRes = await axios({
				method: 'search',
				url: "http://localhost:8080/items",
				headers: {"Access-Control-Allow-Origin": "*"},
				data: {
					event_id : event_id
				}
			});
			return MenuRes.data;
		};
		getMenu().then(setMenu);
		
	}, [1]);
	
	
	
	const onClaimButtonclick = (id) => {
		const user_id = auth.user.uid;
		const  claim_item_req= async () => {
			console.log("claim button clicked");
			const result = await axios({
				method: 'put',
				url: "http://localhost:8080/items/claim",
				headers: {"Access-Control-Allow-Origin": "*"},
				data: {
					itemId:id, participantId:user_id , eventId:event_id
				}
				
			});
			
			return result.data;
		};
		
		claim_item_req().then(value =>{
			if (value != null){
				console.log("Item claimed");
				window.location.reload();
			}
			else{
				console.log("Item not claimed");
			}
		});
		
	};
	
	
	const onDeleteItemButtonclick = (id) => {
		const user_id = auth.user.uid;
		const  delete_item_req= async () => {
			const result = await axios({
				method: 'delete',
				url: "http://localhost:8080/items",
				headers: {"Access-Control-Allow-Origin": "*"},
				data: {
					item_id:id, participant_id:user_id
				}
				
			});
			
			return result.status;
		};
		
		delete_item_req().then(value =>{
			if (value === 200){
				console.log("Item Deleted");
				window.location.reload();
			}
			else{
				console.log("Item not deleted.");
			}
		});
		
	};
	
	
	return (
		<div>
			<div className = "flex flex-col  items-center justify-center">
				<h2>Potluck Details:</h2>

					{event ?
                          event.map((event: { id: number, event_name: string; event_location: string, event_date: string}) => (
                            <div key={event.id}>
                              <label>
                                  <strong>Event Name:</strong> {event.event_name}
                                  <br />
                                </label>
                                <label>
                                  <strong>Event Location: </strong> {event.event_location}
                                  <br />
                                </label>
                                <label>
                                  <strong>Event Date:</strong> {event.event_date}
                                  <br />
                                </label>

                            </div>
                          ))
                          : "Not found"
                    }



				
				<div className="flex flex-col items-center bg-slate-700 w-1/15 p-1 rounded-box mb-10 mt-10 ">
					<h2 className="text-4xl text-blue-600 mb-1">Add new Item:</h2>
					
					<div className="flex items-center mb-1">
                    	<label htmlFor="name" className="text-blue-300 mb-5 mr-4">Item Name:</label>
                    	<input
                    		placeholder="Name..."
                    		type="text"
                    		id="name"
                    		required
                    		value={item_name}
                    		onChange={e => setItemName(e.target.value)}
                    		name="name"
                    		className="input input-bordered w-1/2"
                    	/>
                    </div>


					<div className="flex items-center mb-1">
						<label htmlFor="type" className="text-blue-300 mb-5 mr-6">Item Type:</label>
						<input
							placeholder="Type..."
							type="text"
							id="loc"
							required
							value={item_type}
							onChange={e => setItemType(e.target.value)}
							name="loc"
							className="input input-bordered w-1/2 "
						/>
					</div>

					<div className="flex items-center mb-1">
						<label htmlFor="qty" className="text-blue-300 mb-2 mr-1">Item Quantity:</label>
						<input
							placeholder="Quantity..."
							type="text"
							id="date"
							required
							value={item_quantity}
							onChange={e => setItemQuantity(e.target.value)}
							name="date"
							className="input input-bordered w-1/2 "
						/>
					</div>
					
					
					{
						item_name != null && item_type != null && item_quantity != null &&
                        <div>
                          <button className="btn  btn-sm btn-xs btn-accent mx-1" onClick={onSaveItemButtonclick}>Save</button>
                          <button className="btn  btn-sm btn-xs btn-accent mx-1" onClick={onCancelItemButtonclick}>Cancel</button>
                        </div>
					}
				</div>
				<div className= "flex flex-col  items-center justify-center">
				<table className="table">
				<h2>Item list:</h2>
					<tbody>
					<tr>
						<th>Item Name</th>
						<th>Item Type</th>
						<th>Item Quantity</th>
						<th>User Name</th>
					</tr>
					{fooditem ?
						fooditem.map((fooditem: { id: number, item_name: string; item_type: string, item_quantity: string, claim: number, user_name: string}) => (
							<tr key={fooditem.id}>
								<th>{fooditem.item_name}</th>
								<th>{fooditem.item_type}</th>
								<th>{fooditem.item_quantity}</th>
								<th>{fooditem.user_name}</th>
								<th><button className="btn btn-ghost text-blue-500 underline text-base" onClick={onClaimButtonclick.bind(null,fooditem.id)}>
									{fooditem.claim! ? 'Unclaim' : 'Claim'}</button></th>

								<th><button className="btn btn-ghost text-blue-500 underline text-base" onClick={onDeleteItemButtonclick.bind(null,fooditem.id)}>Delete</button></th>
							</tr>
						))
						: "Not found"}
					</tbody>
				</table>
				</div>
			</div>
		</div>
	);
};
