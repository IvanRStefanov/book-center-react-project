import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { baseUrl } from './utils/variables';

import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import HomePage from './components/home-page/HomePage';
import CatalogPage from './components/catalog-page/CatalogPage';
import BookDetails from './components/book-details/BookDetails';
import PublishPage from './components/publish-page/PublishPage';
import MyAccount from './components/my-account/MyAccout';
import MyPublishedBooks from './components/my-account/my-published-books/MyPublishedBooks';
import MyReviewsAndRates from './components/my-account/my-reviews-and-rates/MyReviewsAndRates';
import MyReadBooks from './components/my-account/my-read-books/MyReadBooks';

function App() {
	const [loggedInUser, setLoggedInUser] = useState('');
	const [reviewedBooks, setReviewedBooks] = useState([]);
	const [readBooks, setReadBooks] = useState([]);
	const [postedBooks, setPostedBooks] = useState([]);


	useEffect(() => {
		const hasLogedInUser = sessionStorage.getItem('userData');

		if (hasLogedInUser) {
			const userFound = JSON.parse(hasLogedInUser);

			setLoggedInUser(userFound);
			console.log('app refresh');
		}
	}, []);

	useEffect(() => {
		async function getMyRatedBooks() {
			const response = await fetch(`${baseUrl}/bookReviews?where=_ownerId%3D%22${loggedInUser._id}%22`);
			const data = await response.json();

			setReviewedBooks(data);
		}
		getMyRatedBooks()

		async function getMyReadBooks() {
			const response = await fetch(`${baseUrl}/booksRead?where=_ownerId%3D%22${loggedInUser._id}%22`);
			const data = await response.json();

			setReadBooks(data)
		}
		getMyReadBooks()

		async function getMyPostedBooks() {
			const response = await fetch(`${baseUrl}/books?where=_ownerId%3D%22${loggedInUser._id}%22`);
			const data = await response.json();

			setPostedBooks(data);
		}
		getMyPostedBooks()
	}, [loggedInUser]);

	async function updateMyReadBooks() {
		const response = await fetch(`${baseUrl}/booksRead?where=_ownerId%3D%22${loggedInUser._id}%22`);
		const data = await response.json();

		setReadBooks(data)
	}

	async function updateMyPostedBooks() {
		const response = await fetch(`${baseUrl}/books?where=_ownerId%3D%22${loggedInUser._id}%22`);
		const data = await response.json();

		setPostedBooks(data);
	}

	return (
		<div className='wrapper'>
			<Header
				loggedInUser={loggedInUser}
				setLoggedInUser={setLoggedInUser}
				postedBooks={postedBooks}
				readBooks={readBooks}
				reviewedBooks={reviewedBooks}
				updateMyPostedBooks={updateMyPostedBooks}
			/>

			<main>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/catalog" element={<CatalogPage />} />
					<Route path="/catalog/:bookId" element={
						<BookDetails
							loggedInUser={loggedInUser}
							updateMyReadBooks={updateMyReadBooks}
							updateMyPostedBooks={updateMyPostedBooks}
							reviewedBooks={reviewedBooks}
						// setLoggedInUser={setLoggedInUser}
						// postedBooks={postedBooks}
						// readBooks={readBooks}
						/>}
					/>
					<Route path="/add-new-book" element={<PublishPage />} />
					<Route path="/my-account" element={<MyAccount loggedInUser={loggedInUser} />}>
						<Route path="my-published-books" element={
							<MyPublishedBooks
								loggedInUser={loggedInUser}
							/>}
						/>
						<Route path="my-reviews-and-rates" element={
							<MyReviewsAndRates
								loggedInUser={loggedInUser}
							/>}
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