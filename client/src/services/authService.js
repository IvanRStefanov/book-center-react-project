import { removeUserData, setUserData } from '../utils/utils';

const baseUrl = 'http://localhost:3030/users';

export async function login(email, password) {
    try {
        const response = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({email, password})
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

export async function register(bodyToSend) {
    console.log(bodyToSend)
    const { firstName, lastName, registerEmail, imageUrl, firstPassword, confPass} = bodyToSend;
    console.log(firstName)

    try {
        if (firstPassword !== confPass) {
            throw new Error("Passwords don't match");
        }

        if(validateEmail(registerEmail) === false) {
            throw new Error('Invalid email addres')
        }

        const email = registerEmail;
        const password = firstPassword;
        console.log(email, password)

        const registerUserData = {
            firstName,
            lastName,
            email,
            imageUrl,
            password
        }
        console.log(registerUserData)

        const response = await fetch(`${baseUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerUserData)
        })

        if (response.ok != true) {
            const err = await response.json();
            console.log(err.message)
            throw new Error(err.message) 
        }

        const data = await response.json();
        return data;
    } catch (err) {
        throw new Error(err.message)
        
    }
}

export async function logout(token) {
    await fetch(`${baseUrl}/logout`, {
        headers: {
            'X-Authorization': token
        }
    });
    removeUserData();
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return regex.test(email);
}