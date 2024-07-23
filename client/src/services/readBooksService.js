import * as requester from '../requester/requester';

const baseUrl = `http://localhost:3030/data/booksRead`;

export async function getTotalCountBookHasBeenRead(bookId) {
    const response = await requester.get(baseUrl + `/?where=bookId%3D%22${bookId}%22&count`);

    return response;
}
export async function addBookToUserReadList(bookId) {
    const response = await requester.post(baseUrl, {bookId});

    return response;
}

export async function getUserReadBooks (userId) {
    const response = await requester.get(baseUrl + `/?where=_ownerId%3d%22${userId}%22`);

    return response;
}