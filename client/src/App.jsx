import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { baseUrl } from './utils/variables';

import * as requester from './requester/requester'

import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import HomePage from './components/home-page/HomePage';
import CatalogPage from './components/catalog-page/CatalogPage';
import BookDetails from './components/book-details/BookDetails';
import PublishPage from './components/publish-page/PublishPage';
import MyAccount from './components/my-account/MyAccout';
import MyPublishedBooks from './components/my-account/my-published-books/MyPublishedBooks';
import MyReviews from './components/my-account/my-reviews/MyReviews';
import MyReadBooks from './components/my-account/my-read-books/MyReadBooks';
import { getUserReviewedBooks } from './services/reviewBookSService';
import { getUserReadBooks } from './services/readBooksService';
import { getUserPostedBooks } from './services/booksService';

function App() {

	const [loggedInUser, setLoggedInUser] = useState('');
	const [userReviewedBooks, setUserReviewedBooks] = useState([]);
	const [userReadBooks, setUserReadBooks] = useState([]);
	const [userPostedBooks, setUserPostedBooks] = useState([]);

	useEffect(() => {
		const hasLogedInUser = sessionStorage.getItem('userData');

		if (hasLogedInUser) {
			const userFound = JSON.parse(hasLogedInUser);

			setLoggedInUser(userFound);
		}
	}, []);

	useEffect(() => {
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

	// console.log(userReviewedBooks)

	return (
		<div className='wrapper'>
			<Header
				loggedInUser={loggedInUser}
				setLoggedInUser={setLoggedInUser}
				userPostedBooks={userPostedBooks}
				userReadBooks={userReadBooks}
				userReviewedBooks={userReviewedBooks}
			/>

			<main>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/catalog" element={<CatalogPage />} />
					<Route path="/catalog/:bookId" element={
						<BookDetails
							loggedInUser={loggedInUser}
							updateUserReadBooks={updateUserReadBooks}
							userReadBooks={userReadBooks}
							updateUserPostedBooks={updateUserPostedBooks}
							userPostedBooks={userPostedBooks}
							updateUserReviewedBooks={updateUserReviewedBooks}
							userReviewedBooks={userReviewedBooks}
						/>}
					/>
					<Route
						path="/add-new-book"
						element={<PublishPage updateUserPostedBooks={updateUserPostedBooks} />}

					/>
					<Route path="/my-account" element={<MyAccount loggedInUser={loggedInUser} />}>
						<Route
							path="my-published-books"
							element={
								<MyPublishedBooks
									loggedInUser={loggedInUser}
									userPostedBooks={userPostedBooks}
								/>
							}
						/>
						<Route
							path="my-reviews-and-rates"
							element={
								<MyReviews
									loggedInUser={loggedInUser}
									userReviewedBooks={userReviewedBooks}
									updateUserReviewedBooks={updateUserReviewedBooks}
								/>
							}
						/>
						<Route path="my-read-books" element={<MyReadBooks />} />
					</Route>
				</Routes>
			</main>

			<Footer />
		</div>
	)
}

export default App