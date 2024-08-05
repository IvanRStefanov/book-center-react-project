import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

import { getAllBooksPaginatedWithSearchOption, getTotalBookCount } from "../../services/booksService";
import TileBook from "../tile-book/TileBook";
import CatalogSearch from "./catalog-search/CatalogSearch";

export default function CatalogPage() {
	const pageParameter = 12;
	const [numberOfBooksToSkip, setNumberOfBooksToSkip] = useState(0);
	const [numberOfBooksToTake, setNumberOfBooksToTake] = useState(pageParameter);

	const [searchString, setSearchString] = useState('');
	const [searchBy, setSearchBy] = useState('');


	async function getBooks(skip = 0, take = 12, searchBy = '', searchString = '') {
		const books = getAllBooksPaginatedWithSearchOption(skip, take, searchBy, searchString);

		return books;
	}

	const {
		isPending: isPendingBooksPaginatedData,
		data: booksPaginatedData,
		error: booksPaginatedError,
	} = useQuery({
		queryKey: ['books-paginated', numberOfBooksToSkip, numberOfBooksToTake, searchBy, searchString],
		queryFn: () => getBooks(numberOfBooksToSkip, numberOfBooksToTake, searchBy, searchString),
	});

	const {
		isPending: isPendingBooksCount,
		data: booksCountData,
		error: booksCountError,
	} = useQuery({
		queryKey: ['books-count', searchBy, searchString],
		queryFn: () => {
			console.log('Inside query books-count: ', 'searchBy: ', searchBy, ' searchString: ', searchString)
			return getTotalBookCount(searchBy, searchString)
		}
	});

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
		console.error(booksPaginatedError);
		return <Navigate to={'/error-page'} />
	}

	function submitSearchHandler(data) {
		setSearchBy(data.searchBy);
		setSearchString(data.searchString);
		setNumberOfBooksToSkip(0);
		setNumberOfBooksToTake(pageParameter)
	}

	const numberOfPagesToDisplay = Math.ceil(booksCountData / pageParameter);
	const currentPageToDisplay = (numberOfBooksToSkip / pageParameter) + 1;
	const isDisabledPrevButton = (numberOfBooksToSkip + pageParameter) === pageParameter;
	const isDisabledNextButton = ((numberOfBooksToSkip / pageParameter) + 1) >= numberOfPagesToDisplay;

	return (
		<section className="section-catalog">
			<div className="shell">
				<div className="section__inner">
					<div className="section__aside">
						<div className="section__aside-search">
							<CatalogSearch
								submitSearchHandler={submitSearchHandler}
								setSearchBy={setSearchBy}
								searchBy={searchBy}
								setSearchString={setSearchString}
								searchString={searchString}
							/>
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
										onClick={
											() => setNumberOfBooksToSkip((oldNumberOfBooksToSkip) => oldNumberOfBooksToSkip - pageParameter)
										}
										disabled={isDisabledPrevButton}
									>
									</button>

									<span className="section__pagination-count">
										{currentPageToDisplay} / {Math.ceil(booksCountData / pageParameter)}
									</span>

									<button
										className="section__pagination-btn section__pagination-btn--next"
										onClick={
											() => setNumberOfBooksToSkip((oldNumberOfBooksToSkip) => oldNumberOfBooksToSkip + pageParameter)
										}
										disabled={isDisabledNextButton}
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