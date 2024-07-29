import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { UserContextProvider } from './contexts/UserContext';

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

function App() {

	return (
		<UserContextProvider>
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
		</UserContextProvider>
	)
}

export default App