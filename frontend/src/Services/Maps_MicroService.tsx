import { httpClient } from "@/Services/HttpClient.tsx";
import axios from "axios";
import {response} from "msw";

const serverIP = import.meta.env.API_HOST_MAPS;
const serverPort = import.meta.env.MAPS_PORT;



export const Maps_Microservices = {
	async send(location) {
		
		
		const data = JSON.stringify({
			location: location
		});
		
		const config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: 'http://localhost:7000/location',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
			data : data
		};
		
		return axios.request(config);
		
			
		
		
	}
};
