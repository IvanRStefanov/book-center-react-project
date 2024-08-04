import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

import { getAllBooksPaginatedWithSearchName, getTotalBookCount, searchBookByName } from "../../services/booksService";
import TileBook from "../tile-book/TileBook";

export default function TestCatalogPage() {
	const pageParameter = 12;
	const [numberOfBooksToSkip, setNumberOfBooksToSkip] = useState(0);
	const [numberOfBooksToTake, setNumberOfBooksToTake] = useState(pageParameter);

	const [searchString, setSearchString] = useState('')

	async function getBooks(skip = 0, take = 10, searchString = '') {
		return await getAllBooksPaginatedWithSearchName(skip, take, searchString);
	}

	const {
		isPending: isPendingBooksPaginatedData,
		data: booksPaginatedData,
		error: booksPaginatedError,
	} = useQuery({
		queryKey: ['books-paginated', numberOfBooksToTake],
		queryFn: () => getBooks(numberOfBooksToSkip, numberOfBooksToTake, searchString),
	});

	const {
		isPending: isPendingBooksCount,
		data: booksCountData,
		error: booksCountError,
	} = useQuery({
		queryKey: ['books-count'],
		queryFn: () => getTotalBookCount()
	})

	if (isPendingBooksPaginatedData || isPendingBooksCount) {
		return (
			<div className="section-catalog">
				<div className="shell">
					<div className="section__loading"></div>
				</div>
			</div>
		)
	}

	if (booksPaginatedError || booksCountError) {
		console.error(booksPaginatedError)
		return <Navigate to={'/error-page'} />
	}

	// console.log('numberOfBooksToSkip: ', numberOfBooksToSkip);
	// console.log('numberOfBooksToTake: ', numberOfBooksToTake);
	const numberOfPagesToDisplay = Math.ceil(booksCountData / pageParameter);
	const currentPageToDisplay = numberOfBooksToTake / pageParameter;

	return (
		<section className="section-catalog">
			<div className="shell">
				<div className="section__inner">
					<div className="section__aside">
						<div className="section__aside-search">
							<form className="search" >
								<input className="search__field" type="text" placeholder="Search by title..." onChange={(e) => setSearchString(e.target.value)} />

								<button className="search__btn">
									<img src=".././src/assets/svgs/magnifying-glass.svg" alt="" />
								</button>
							</form>
						</div>
					</div>

					<div className="section__main">
						{booksPaginatedData.length > 0
							?
							<>
								<div className="section__items">
									{booksPaginatedData.map(book =>
										<div className="section__item" key={book._id}>
											<TileBook book={book} className="tile-book tile-book--catalog" />
										</div>
									)}
								</div>

								<div className="section__pagination">
									<button
										className="section__pagination-btn"
										onClick={() => {
											setNumberOfBooksToTake((oldDumberOfBooksToTake) => Math.max(oldDumberOfBooksToTake - pageParameter, 0));
											setNumberOfBooksToSkip((oldNumberOfBooksToSkip) => Math.max(oldNumberOfBooksToSkip - pageParameter, 0));
										}}
										disabled={numberOfBooksToTake === pageParameter}
									>
									</button>

									<span
										className="section__pagination-count"
									>
										{currentPageToDisplay} / {Math.ceil(booksCountData / pageParameter)}
									</span>

									<button
										className="section__pagination-btn section__pagination-btn--next"
										onClick={() => {

											setNumberOfBooksToTake((oldNumberOfBooksToTake) => oldNumberOfBooksToTake + pageParameter);
											setNumberOfBooksToSkip((oldNumberOfBooksToSkip) => oldNumberOfBooksToSkip + pageParameter);
											// console.log('offset: ', numberOfBooksToSkip)

										}}
										disabled={(numberOfBooksToTake / pageParameter) >= numberOfPagesToDisplay}
									>
									</button>
								</div>
							</>
							:
							<div className="section__empty">
								<p>There are no posted books yet.</p>
							</div>
						}
					</div>
				</div>
			</div>
		</section >
	);
}