import * as requester from '../requester/requester';

const baseUrl = `http://localhost:3030/data/books`;

export async function getAllBooks() {
    const result = await requester.get(baseUrl);

    return result;
}

export async function getSingleBook(bookId) {
    const result = await requester.get(baseUrl + `/${bookId}`)

    return result;
}

export async function getLatestFiveBooks() {
    const result = await requester.get(baseUrl + '?sortBy=_createdOn%20desc&pageSize=5');

    return result;
}

export async function deleteBook(bookId) {
   await requester.del(baseUrl + `/${bookId}`);
}
