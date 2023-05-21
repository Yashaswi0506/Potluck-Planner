import 'chai/register-should.js';  // Using Should style

import {test, teardown} from "tap";
import {faker} from "@faker-js/faker";
import app from '../src/app.js';



test("List all users from /dbTest", async () => {
	const response = await app.inject({
		method: "GET",
		url: "/dbTest"
	});
	
	response.statusCode.should.equal(200);
});

test("Creating a new user", async () => {
	
	const payload = {
		name: "Testname",
		email: faker.internet.email(),
	};
	
	const response = await app.inject({
		method: "POST",
		url: "/users",
		payload
	});
	
	response.statusCode.should.equal(200);
	response.payload.should.not.equal(payload);
	const resPayload = response.json();
	resPayload.email.should.equal(payload.email);
	
});

teardown( () => app.close());
