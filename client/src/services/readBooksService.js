import * as requester from '../requester/requester';

const baseUrl = `http://localhost:3030/data/booksRead`;

export async function readByUserStatus(bookId, loggedInUserId) {
    const response = await requester.get(baseUrl + `?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${loggedInUserId}%22&count`);

    console.log(response)

    return response;
}