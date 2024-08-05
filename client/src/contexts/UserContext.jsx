import { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserContextProvider(props) {
    const [loggedInUser, setLoggedInUser] = useState(() => {
        const hasLogedInUser = sessionStorage.getItem('userData');

        if (hasLogedInUser) {
            const userFound = JSON.parse(hasLogedInUser);

            return userFound
        }
    });

    const user = {
        user: loggedInUser || '',
        updateUser: setLoggedInUser || function () { },
    }

    return (
        <UserContext.Provider value={user} >
            {props.children}
        </UserContext.Provider>
    );
}