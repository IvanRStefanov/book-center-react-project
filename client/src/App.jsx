import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import HomePage from './components/pages/home-page/HomePage';
import CatalogPage from './components/pages/catalog-page/CatalogPage';
import BookDetails from './components/pages/book-details/BookDetails';
import PublishPage from './components/pages/publish-page/PublishPage';
import MyAccount from './components/pages/my-account/MyAccout';
import MyPublishedBooks from './components/pages/my-account/my-published-books/MyPublishedBooks';
import MyReviewsAndRates from './components/pages/my-account/my-reviews-and-rates/MyReviewsAndRates';
import MyReadBooks from './components/pages/my-account/my-read-books/MyReadBooks';


function App() {
	const [loggedInUser, setLoggedInUser] = useState('');

	useEffect(() => {
		const hasLogedInUser = sessionStorage.getItem('userData');

		if(hasLogedInUser) {
			const userFound = JSON.parse(hasLogedInUser);
			setLoggedInUser(userFound);
		}
	}, [])

	return (
		<div className='wrapper'>
			<Header loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>

			<main>
				<Routes>
					<Route path="/" element={<HomePage />} /> 
					<Route path="/catalog" element={<CatalogPage />} />
					<Route path="/catalog/:bookId" element={<BookDetails loggedInUser={loggedInUser} />} />
					<Route path="/add-new-book" element={<PublishPage />} />
					<Route path="/my-account" element={<MyAccount loggedInUser={loggedInUser}/>}>
						<Route path="my-published-books" element={<MyPublishedBooks loggedInUser={loggedInUser}/>}/>
						<Route path="my-reviews-and-rates" element={<MyReviewsAndRates loggedInUser={loggedInUser}/>}/>
						<Route path="my-read-books" element={<MyReadBooks/>}/>
					</Route>
				</Routes>
			</main>

			<Footer />
		</div>
	)
}

export default App
