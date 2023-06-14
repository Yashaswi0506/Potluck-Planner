import { httpClient } from "@/Services/HttpClient.tsx";

const serverIP = import.meta.env.API_HOST;
const serverPort = import.meta.env.PORT;

const serverUrl = `http://${serverIP}:${serverPort}`;

export const FindhostStatus = {
	async send(id, participant_id) {
		const requestData = {
			id: id,
			participant_id:participant_id
			
		};
		const config = {
			method : 'search',
			url: serverUrl + "/participants/ishost",
			data: requestData
		};
		return httpClient.request(config)
			.then((response) => {
				console.log(JSON.stringify(response.data));
				return response.data;
			});
	}
};
