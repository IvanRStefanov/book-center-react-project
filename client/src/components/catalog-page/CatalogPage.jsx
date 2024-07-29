import { useEffect, useState } from "react";
// import { baseUrl } from "../../utils/variables";
import { getAllBooks, searchBookByName } from "../../services/booksService";

import TileBook from "../tile-book/TileBook";

export default function CatalogPage() {

	const [books, setBooksData] = useState([]);
	const [searchString, setSearchString] = useState('');
	const [noBooksBySearch, setNoBooksBySearch] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getBooks() {
			try {
				const responseData = await getAllBooks();
				setLoading(true);
				setBooksData(responseData);
				setLoading(false);


			} catch (error) {
				setLoading(false);
				console.log(error.message)
			}
		}

		getBooks();
	}, []);

	async function searchBookByNameHandler(e) {
		e.preventDefault();
		const bookResults = await searchBookByName(searchString);
		setLoading(true);

		if (bookResults.length == 0) {
			setNoBooksBySearch(oldState => !oldState);
		}
		setLoading(false)
		setBooksData(bookResults);
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
											{(books.length == 0 && noBooksBySearch) && <p>There are no books that match <em>'{searchString}'</em> search </p>}
											{(books.length == 0 && !noBooksBySearch) && <p>There are no books currently.</p>}
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