import { useEffect, useState } from "react";
import { getAllBooks, searchBookByName } from "../../services/booksService";

import TileBook from "../tile-book/TileBook";

export default function CatalogPage() {

	const [books, setBooks] = useState([]);
	const [searchString, setSearchString] = useState('');
	const [searchedFor, setSearchedFor] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getBooks() {
			try {
				const responseData = await getAllBooks();
				setLoading(true);
				setBooks(responseData);
				setLoading(false);

			} catch (error) {
				setLoading(false);
				console.error(error.message)
			}
		}

		getBooks();
	}, []);

	async function searchBookByNameHandler(e) {
		e.preventDefault();

		setSearchedFor(searchString);
		setLoading(true);

		const bookResults = await searchBookByName(searchString);
		
		setBooks(bookResults);
		setLoading(false)
	}

	return (
		<section className="section-catalog">
			<div className="shell">
				<div className="section__inner">
					<div className="section__aside">
						<div className="section__aside-search">
							<form className="search" onSubmit={searchBookByNameHandler}>
								<input className="search__field" type="text" placeholder="Search by title..." onChange={(e) => setSearchString(e.target.value)} />

								<button className="search__btn">
									<img src=".././src/assets/svgs/magnifying-glass.svg" alt="" />
								</button>
							</form>
						</div>
					</div>

					<div className="section__main">
						{loading
							? <div className="section__loading"></div>
							: <>
								{books.length > 0
										?
										<div className="section__items">
											{books.map(book =>
												<div className="section__item" key={book._id}>
													<TileBook book={book} className="tile-book tile-book--catalog" />
												</div>
											)}
										</div>
										:
										<div className="section__empty">
											{(books.length == 0 && searchedFor) && <p>There are no books that match <em>'{searchedFor}'</em> search </p>}
											{(books.length == 0 && !searchedFor) && <p>There are no books currently.</p>}
										</div>
								}
							</>
						}

					</div>

				</div>
			</div>
		</section >
	);
}