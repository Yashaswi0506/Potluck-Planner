//fetch the details of the potluck
//if the authenticated user is a host, the edit, delete and "add item" buttons should get displayed
//if the authenticated user is not a host, only potluck details should get displayed
//if the authenticated user is not a host, RSVP button should get displayed
//if the authenticated user is not a host, menu list added by the  host, should get displayed
//menu is a table with "item name", "item type", "item quantity", "claim" and "unclaim" columns.
//claim and unclaim columns  will contain a radio button




import {AuthenticatedUser, ProfileType} from "@/PotluckTypes.ts";
import {Route, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Login} from "@/Components/Login.tsx";
import {Col, Row} from "react-bootstrap";

export const ManagePotluck = () => {

    const [event, setEvent] = useState([]);
    const [item_name, setItemName] = useState("");
    const [item_type, setItemType] = useState("");
    const [item_quantity, setItemQuantity] = useState("");
    const [fooditem, setMenu] = useState([]);


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
         const  claim_item_req= async () => {
             console.log("claim button clicked");
             const result = await axios({
                 method: 'put',
                 url: "http://localhost:8080/items/claim",
                 headers: {"Access-Control-Allow-Origin": "*"},
                 data: {
                     itemId:id, participantId:AuthenticatedUser.id , eventId:event_id
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

     const onEditItemButtonclick = () => {

     };

    const onDeleteItemButtonclick = (id) => {
        const  delete_item_req= async () => {
            const result = await axios({
                method: 'delete',
                url: "http://localhost:8080/items",
                headers: {"Access-Control-Allow-Origin": "*"},
                data: {
                    item_id:id, participant_id:AuthenticatedUser.id
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
           <div>
                <h2>Potluck Details:</h2>
                <table border={1}>
                    <tbody>
                    <tr>
                        <th>Event Name</th>
                        <th>Event Location</th>
                        <th>Event Date</th>
                    </tr>
                    {event ?
                        event.map((event: { id: number, event_name: string; event_location: string, event_date: string}) => (
                            <tr key={event.id}>
                                <th>{event.event_name}</th>
                                <th>{event.event_location}</th>
                                <th>{event.event_date}</th>

                            </tr>
                        ))
                        : "Not found"}

                    </tbody>
                </table>

               <div className="flex flex-col items-center bg-slate-700 w-4/5 mx-auto p-5 rounded-box">
                   <h2 className="text-4xl text-blue-600 mb-5">Add new Item:</h2>

                   <div className="flex flex-col w-full mb-5">
                       <label htmlFor="name" className="text-blue-300 mb-2">Item Name:</label>
                       <input
                           placeholder="Name..."
                           type="text"
                           id="name"
                           required
                           value={item_name}
                           onChange={e => setItemName(e.target.value)}
                           name="name"
                           className="input input-bordered"
                       />
                   </div>


                   <div className="flex flex-col w-full mb-5">
                       <label htmlFor="loc" className="text-blue-300 mb-2">Item Type:</label>
                       <input
                           placeholder="location..."
                           type="text"
                           id="loc"
                           required
                           value={item_type}
                           onChange={e => setItemType(e.target.value)}
                           name="loc"
                           className="input input-bordered"
                       />
                   </div>

                   <div className="flex flex-col w-full mb-5">
                       <label htmlFor="date" className="text-blue-300 mb-2">Item Quantity:</label>
                       <input
                           placeholder="date..."
                           type="text"
                           id="date"
                           required
                           value={item_quantity}
                           onChange={e => setItemQuantity(e.target.value)}
                           name="date"
                           className="input input-bordered"
                       />
                   </div>


                   {
                       item_name != null && item_type != null && item_quantity != null &&
                       <div>
                           <button className="btn btn-primary btn-circle" onClick={onSaveItemButtonclick}>Save</button>
                           <button className="btn btn-primary btn-circle" onClick={onCancelItemButtonclick}>Cancel</button>
                       </div>
                   }
               </div>
               <table border={1}>
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
                               <th><button className="btn btn-primary btn-circle" onClick={onClaimButtonclick.bind(null,fooditem.id)}>
                                   {fooditem.claim! ? 'Unclaim' : 'Claim'}</button></th>
                               <th></th>
                               <th><button className="btn btn-primary btn-circle" onClick={onEditItemButtonclick}>Edit</button></th>
                               <th><button className="btn btn-primary btn-circle" onClick={onDeleteItemButtonclick.bind(null,fooditem.id)}>Delete</button></th>
                           </tr>
                       ))
                       : "Not found"}
                   </tbody>
               </table>
            </div>
        </div>

    );
};

//<th><button className="btn btn-primary btn-circle" onClick={onEditPotluck}>Edit</button></th>
//<th><button className="btn btn-primary btn-circle" onClick={onDeletePotluck}>Delete</button></th>


