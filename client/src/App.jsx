import { Routes, Route } from 'react-router-dom';

import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import HomePage from './components/pages/home-page/HomePage';
import CatalogPage from './components/pages/catalog-page/CatalogPage';
import BookDetails from './components/pages/book-details/BookDetails';
import PublishPage from './components/pages/publish-page/PublishPage';


function App() {

	return (
		<div className='wrapper'>
			<Header />

			<main>
				<Routes>
					<Route path="/" element={<HomePage />} /> 
					<Route path="/catalog" element={<CatalogPage />} />
					<Route path="/catalog/:bookId" element={<BookDetails />} />
					<Route path="/add-new-book" element={<PublishPage />} />
				</Routes>
				
			</main>

			<Footer />
		</div>
	)
}

export default App
