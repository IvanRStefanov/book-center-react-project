import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import UserContext from './contexts/UserContext';

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
import BookEdit from './components/book-edit/BookEdit';

import { getUserReviewedBooks } from './services/reviewBookSService';
import { getUserReadBooks } from './services/readBooksService';
import { getUserPostedBooks } from './services/booksService';


function App() {

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
		<UserContext.Provider value={user}>
			<div className='wrapper'>
				<Header />

				<main>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/catalog" element={<CatalogPage />} />
						<Route path="/catalog/:bookId" element={<BookDetails />} />
						<Route path="/catalog/:bookId/edit" element={<BookEdit />} />
						<Route path="/add-new-book" element={<PublishPage />} />
						<Route path="/my-account" element={<MyAccount />}>
							<Route path="my-published-books" element={<MyPublishedBooks />} />
							<Route path="my-reviews" element={<MyReviews />} />
							<Route path="my-read-books" element={<MyReadBooks />} />
						</Route>
					</Routes>
				</main>

				<Footer />
			</div>
		</UserContext.Provider>
	)
}

export default App