import { removeUserData } from '../utils/utils';
import * as requester from '../requester/requester';

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export async function login(email, password) {
	try {
		const response = await fetch(`${baseUrl}/login`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		});

		if (response.ok !== true) {
			const err = await response.json();
			throw new Error(err.message)
		}

		const userData = await response.json();
		delete userData.password;

		return userData;

	} catch (error) {
		throw new Error(error.message);
	}
}

export async function registerNewUser(dataObj) {
	const {
		firstName,
		lastName,
		registerEmail,
		imageUrl,
		firstPassword
	} = dataObj;

	try {

		const registerUserData = {
			firstName,
			lastName,
			email: registerEmail,
			imageUrl,
			password: firstPassword
		}

		const response = await fetch(`${baseUrl}/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(registerUserData)
		})

		if (response.ok != true) {
			const err = await response.json();

			throw new Error(err.message)
		}

		const data = await response.json();
		delete data.password;

		return data;
	} catch (err) {
		throw new Error(err.message)

	}
}

export async function logout() {
	await requester.get(baseUrl + '/logout');
	removeUserData();
}
