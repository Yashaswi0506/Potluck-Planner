import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { User, UserRole } from "../db/entities/User.js";
import { ICreateUsersBody, IUpdateUsersBody } from "../types.js";
import { SOFT_DELETABLE_FILTER } from "mikro-orm-soft-delete";
import {verifyToken} from "../plugins/verifyTokenConfig.js";

export function UserRoutesInit(app: FastifyInstance) {
	// Route that returns all users, soft deleted and not

	// Route that returns all users, soft deleted and not
	app.get("/dbTest", async (request: FastifyRequest, _reply: FastifyReply) => {
		return request.em.find(User, {}, { filters: { [SOFT_DELETABLE_FILTER]: false } });
	});

	// Route that returns all users who ARE NOT SOFT DELETED
	app.get("/users", async (req, reply) => {
		try {
			const theUser = await req.em.find(User, {});
			reply.send(theUser);
		} catch (err) {
			reply.status(500).send(err);
		}
	});

	// User CRUD
	// Refactor note - We DO use email still for creation!  We can't know the ID yet
	app.post<{ Body: ICreateUsersBody }>("/users", async (req, reply) => {
		const { id, name, email } = req.body;
		
		try {
			const newUser = await req.em.create(User, {
				id,
				name,
				role: UserRole.USER,
				email,
			});
			
			await req.em.flush();
			return reply.send(newUser);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});

	//READ
	app.search("/users", async (req, reply) => {
		const { id } = req.body;
		
		try {
			const users = await req.em.find(User, { id: { $in: id } });
			const hostnames = users.map((user) => ({ id: user.id, hostname: user.name }));
			reply.send(hostnames);
		} catch (err) {
			reply.status(500).send(err);
		}
	});

	// UPDATE
	app.put<{ Body: IUpdateUsersBody }>("/users", async (req, reply) => {
		const { name, id } = req.body;

		const userToChange = await req.em.findOneOrFail(User, id, { strict: true });
		userToChange.name = name;

		// Reminder -- this is how we persist our JS object changes to the database itself
		await req.em.flush();
		reply.send(userToChange);
	});

	// DELETE
	app.delete<{ Body: { my_id: string; id_to_delete: string; password: string } }>(
		"/users",
		async (req, reply) => {
			const { my_id, id_to_delete, password } = req.body;

			try {
				// Authenticate my user's role
				const me = await req.em.findOneOrFail(User, my_id, { strict: true });
				// Check passwords match

				// Make sure the requester is an Admin
				if (me.role === UserRole.USER) {
					return reply.status(401).send({ message: "You are not an admin!" });
				}

				const theUserToDelete = await req.em.findOneOrFail(User, id_to_delete, { strict: true });

				//Make sure the to-be-deleted user isn't an admin
				if (theUserToDelete.role === UserRole.ADMIN) {
					return reply
						.status(401)
						.send({ message: "You do not have enough privileges to delete an Admin!" });
				}

				await req.em.remove(theUserToDelete).flush();
				return reply.send(theUserToDelete);
			} catch (err) {
				return reply.status(500).send(err);
			}
		}
	);
	
	app.post<{
		Body: {
			uid:string
		}, Headers: {
			'Authorization' : string
		}
	}>("/login", async (req, reply) => {
		const { uid } = req.body;
		const token= req.headers.authorization.replace('Bearer ', '');
		console.log(token);
		try {
			if (uid != null && token != null) {
				
				const authorization = await verifyToken(token, uid);
				console.log(authorization);
				console.log("done");
				
				if (authorization.user_id != uid) {
					return reply.status(403).send("unauthorized");
				} else {
					return reply.status(200).send("authorized");
				}
			}
		}
		
		catch (e)
			{
				return reply.status(401);
			}
			
		
		
		
		
	});
}
