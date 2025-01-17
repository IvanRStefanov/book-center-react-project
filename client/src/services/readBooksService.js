import * as requester from '../requester/requester';

const baseUrl = `http://localhost:3030/data/booksRead`;

export async function getTotalCountBookHasBeenRead(bookId) {
    const response = await requester.get(baseUrl + `/?where=bookId%3D%22${bookId}%22&count`);

    return response;
}
export async function addBookToUserReadList(bookId, bookImgUrl) {
    const response = await requester.post(baseUrl, {bookId, bookImgUrl});

    return response;
}

export async function getUserReadBooks (userId) {
    const response = await requester.get(baseUrl + `/?where=_ownerId%3d%22${userId}%22`);

    return response;
}

export async function getUserReadBooksPaginated (userId, skip = 0, take = 8) {
    const response = await requester.get(baseUrl + `/?where=_ownerId%3d%22${userId}%22&offset=${skip}&pageSize=${take}`);

    return response;
}

export async function getUserReadBooksCount(userId) {
    const response = await requester.get(baseUrl + `/?where=_ownerId%3d%22${userId}%22&count`);

    return response;
}