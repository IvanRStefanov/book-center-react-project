import { createContext, useState, useEffect } from 'react';


import { getUserReviewedBooks } from '../services/reviewBookSService';
import { getUserReadBooks } from '../services/readBooksService';
import { getUserPostedBooks } from '../services/booksService';

export const UserContext = createContext({
    user: '',
    updateUser: function () { },
    postedBooks: [],
    updatePostedBooks: function () { },
    reviewedBooks: [],
    updateReviews: function () { },
    readBooks: [],
    updateReadBooks: function () { },
});

export function UserContextProvider(props) {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [userReviewedBooks, setUserReviewedBooks] = useState([]);
    const [userReadBooks, setUserReadBooks] = useState([]);
    const [userPostedBooks, setUserPostedBooks] = useState([]);

    const user = {
        user: loggedInUser || '',
        updateUser: setLoggedInUser || function () { },
        postedBooks: userPostedBooks || [],
        updatePostedBooks: updateUserPostedBooks || function () { },
        reviewedBooks: userReviewedBooks || [],
        updateReviews: updateUserReviewedBooks || function () { },
        readBooks: userReadBooks || [],
        updateReadBooks: updateUserReadBooks || function () { },
    }
    // console.log(user)

    useEffect(() => {
        const hasLogedInUser = sessionStorage.getItem('userData');

        if (hasLogedInUser) {
            const userFound = JSON.parse(hasLogedInUser);

            setLoggedInUser(userFound);
        }
    }, []);

    useEffect(() => {
        if (loggedInUser) {
            async function getMyReviewedBooks() {
                const response = await getUserReviewedBooks(loggedInUser._id);

                setUserReviewedBooks(response);
            }
            getMyReviewedBooks()

            async function getMyReadBooks() {
                const response = await getUserReadBooks(loggedInUser._id);

                setUserReadBooks(response)
            }
            getMyReadBooks()

            async function getMyPostedBooks() {
                const response = await getUserPostedBooks(loggedInUser._id);

                setUserPostedBooks(response);
            }
            getMyPostedBooks()
        }
    }, [loggedInUser]);

    async function updateUserReadBooks() {
        const response = await getUserReadBooks(loggedInUser._id);

        setUserReadBooks(response)
    }

    async function updateUserPostedBooks() {
        const response = await getUserPostedBooks(loggedInUser._id);

        setUserPostedBooks(response);
    }

    async function updateUserReviewedBooks() {
        const response = await getUserReviewedBooks(loggedInUser._id);

        setUserReviewedBooks(response);
    }
    
    return (
        <UserContext.Provider value={user} >
            {props.children}
        </UserContext.Provider>
    );
}