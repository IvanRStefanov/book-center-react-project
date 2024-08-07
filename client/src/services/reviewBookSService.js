import * as requester from '../requester/requester';

const baseUrl = `${import.meta.env.VITE_API_URL}/data/bookReviews`;

export async function getBookReviewsById(bookId) {
    const result = await requester.get(baseUrl + `?where=bookId%3D%22${bookId}%22`)

    return result;
}

export async function deleteUserReview(reviewId) {
    const result = await requester.del(baseUrl + `/${reviewId}`);

    return result;
}

export async function createUserReview(reviewBody) {
    const result = await requester.post(baseUrl, reviewBody);

    return result;
}

export async function getUserReviewedBooks(userId) {
    const result = await requester.get(baseUrl + `?where=_ownerId%3D%22${userId}%22`);

    return result;
}

export async function getUserReviewedBooksPaginated(userId, skip = 0, take = 4) {
    const result = await requester.get(baseUrl + `?where=_ownerId%3D%22${userId}%22&offset=${skip}&pageSize=${take}`);

    return result;
}

export async function getUserReviewedBooksCount(userId) {
    const result = await requester.get(baseUrl + `?where=_ownerId%3D%22${userId}%22&count`);

    return result;
}
