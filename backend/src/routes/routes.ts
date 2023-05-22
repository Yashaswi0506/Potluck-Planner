import dotenv from "dotenv";
dotenv.config();

import { FastifyInstance } from "fastify";
import { UserRoutesInit } from "./user_routes.js";
import { NotificationRoutesInit } from "./notification_routes.js";
import { ParticipantRoutesInit } from "./participant_routes.js";

/** This function creates all backend routes for the site
 *
 * @param {FastifyInstance} app - The base Fastify listen server instance
 * @param {{}} _options - Fastify instance options (Optional)
 * @returns {Promise<void>} - Returns all of the initialized routes
 */
async function PotluckRoutes(app: FastifyInstance, _options = {}) {
	if (!app) {
		throw new Error("Fastify instance has no value during routes construction");
	}

	UserRoutesInit(app);
	NotificationRoutesInit(app);
	ParticipantRoutesInit(app);
}

export default PotluckRoutes;
