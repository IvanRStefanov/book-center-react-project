import { createContext } from 'react';

const UserContext = createContext({
    user: '',
    updateUser: function () {},
    postedBooks: [],
    updatePostedBooks: function () {},
    reviewedBooks: [],
    updateReviews: function () {},
    readBooks: [],
    updateReadBooks: function() {},
});

export default UserContext;