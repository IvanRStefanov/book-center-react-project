import { removeUserData } from '../utils/utils';
import * as requester from '../requester/requester';

const baseUrl = 'http://localhost:3030/users';

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
        return userData;

    } catch (error) {
        throw new Error(error.message);
    }
}

export async function register(dataObj) {
    const {
        firstName,
        lastName,
        registerEmail,
        imageUrl,
        firstPassword,
        confPass
    } = dataObj;

    try {
        Object.values(dataObj).forEach(value => {
            if (value == '') {
                throw new Error('No empty fields allowed!')
            }
        })

        if (firstPassword !== confPass) {
            throw new Error("Passwords don't match");
        }

        if (validateEmail(registerEmail) === false) {
            throw new Error('Invalid email address')
        }

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
        return data;
    } catch (err) {
        throw new Error(err.message)

    }
}

export async function logout() {
    
    await requester.get(baseUrl + '/logout');
    removeUserData();
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);
}