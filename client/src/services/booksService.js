import * as requester from '../requester/requester';

const baseUrl = `http://localhost:3030/data/books`;

export async function getAllBooks() {
    const result = await requester.get(baseUrl);

    return result;
}

export async function getAllBooksPaginatedWithSearchOption(
    skip,
    take,
    searchBy,
    searString
) {
    if (searchBy) {
        const result = await requester.get(baseUrl + `?offset=${skip}&pageSize=${take}&where=${searchBy} LIKE %22${searString}%22`);

        return result;
    }

    const result = await requester.get(baseUrl + `?offset=${skip}&pageSize=${take}&where=name LIKE %22${searString}%22`);

    return result;
}

export async function getTotalBookCount(searchBy, searchString) {
    if (searchBy) {
        return requester.get(baseUrl + `?where=${searchBy} LIKE %22${searchString}%22&count`);
    }

    return await requester.get(baseUrl + '?count');
}

export async function getSingleBook(bookId) {
    const result = await requester.get(baseUrl + `/${bookId}`)

    return result;
}

export async function getUserPostedBooksPaginated(userId, skip = 0, take = 8) {
    const response = await requester.get(baseUrl + `/?where=_ownerId%3D%22${userId}%22&offset=${skip}&pageSize=${take}`);

    return response;
}

export async function getUserPostedBooksCount(userId) {
    const response = await requester.get(baseUrl + `/?where=_ownerId%3D%22${userId}%22&count`);

    return response;
}

export async function getLatestFiveBooks() {
    const result = await requester.get(baseUrl + '?sortBy=_createdOn%20desc&pageSize=5');

    return result;
}

export async function updateBook(bookId, bookData) {
    const result = await requester.patch(baseUrl + `/${bookId}`, bookData);

    return result;
}

export async function deleteBook(bookId) {
    await requester.del(baseUrl + `/${bookId}`);
}

export async function deleteBookFromOtherCollectionsAsAdmin(bookId) {
    try {
        const readCollectionUrl = 'http://localhost:3030/data/booksRead';
        const reviewsCollectionUrl = 'http://localhost:3030/data/bookReviews';

        const bookReadCollectionsByBookIdResponse = await fetch(`${readCollectionUrl}?where=bookId%3D%22${bookId}%22`);
        if (bookReadCollectionsByBookIdResponse.ok != true) {
            const err = await bookReadCollectionsByBookIdResponse.json();
            throw new Error(err.message);
        }
        const bookReadCollectionsByBookIdData = await bookReadCollectionsByBookIdResponse.json();

        const bookReviewCollectionsByBookIdResponse = await fetch(`${reviewsCollectionUrl}?where=bookId%3D%22${bookId}%22`);
        if (bookReviewCollectionsByBookIdResponse.ok != true) {
            const err = await bookReviewCollectionsByBookIdResponse.json();
            throw new Error(err.message)
        }
        const bookReviewCollectionsByBookIdData = await bookReviewCollectionsByBookIdResponse.json();

        bookReadCollectionsByBookIdData.forEach(async (collection) => {
            const delResponseReadCollection = await fetch(`${readCollectionUrl}/${collection._id}`, {
                method: 'DELETE',
                headers: {
                    'X-Admin': ''
                }
            });

            if (delResponseReadCollection.ok != true) {
                const err = await delResponseReadCollection.json();
                throw new Error(err.message)
            }
        })

        bookReviewCollectionsByBookIdData.forEach(async (collection) => {
            const delResponseReviewCollection = await fetch(`${reviewsCollectionUrl}/${collection._id}`, {
                method: 'DELETE',
                headers: {
                    'X-Admin': ''
                }
            });

            if (delResponseReviewCollection.ok != true) {
                const err = await delResponseReviewCollection.json();
                throw new Error(err.message)
            }
        })

    } catch (error) {
        console.error(error.message);
    }

}

export async function createNewBook(bookData) {
    const result = await requester.post(baseUrl, bookData);

    return result;
}

export async function searchBookByName(stringVal) {
    const result = await requester.get(baseUrl + `?where=name LIKE %22${stringVal}%22`);

    return result;
}