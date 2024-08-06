import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useLocation, useSearchParams } from "react-router-dom";
import * as qs from 'qs';

import { getAllBooksPaginatedWithSearchOption, getTotalBookCount } from "../../services/booksService";
import TileBook from "../tile-book/TileBook";
import CatalogSearch from "./catalog-search-with-url/CatalogSearchWithUrl";

export default function CatalogPageWithUrlSearch() {
	const pageParameter = 12;

	const location = useLocation();
	console.log('location search sliced: ', location.search.slice(1))
	const querySearch = qs.parse(location.search.slice(1));
	console.log('querySearch: ', querySearch)

	console.log(Number(querySearch.numberOfBooksToSkip))
	const [numberOfBooksToSkip, setNumberOfBooksToSkip] = useState(() => { console.log(1); return (Number(querySearch.numberOfBooksToSkip) || 0) });
	console.log('numberOfBooksToSkip: ', numberOfBooksToSkip)

	const [numberOfBooksToTake, setNumberOfBooksToTake] = useState(pageParameter);
	const [searchString, setSearchString] = useState(querySearch.searchString || '');
	const [searchBy, setSearchBy] = useState(querySearch.searchBy || '');
	const [searchParams, setSearchParams] = useSearchParams()

	async function getBooks(skip = 0, take = pageParameter, searchBy = '', searchString = '') {
		const books = getAllBooksPaginatedWithSearchOption(skip, take, searchBy, searchString);

		return books;
	}

	const {
		isPending: isPendingBooksPaginatedData,
		data: booksPaginatedData,
		error: booksPaginatedError,
	} = useQuery({
		queryKey: ['books-paginated', location, numberOfBooksToSkip, numberOfBooksToTake, searchBy, searchString],
		queryFn: () => getBooks(numberOfBooksToSkip, numberOfBooksToTake, searchBy, searchString),
	});

	const {
		isPending: isPendingBooksCount,
		data: booksCountData,
		error: booksCountError,
	} = useQuery({
		queryKey: ['books-count', searchBy, searchString],
		queryFn: () => getTotalBookCount(searchBy, searchString)
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
		setSearchParams({
			numberOfBooksToSkip: 0,
			...data
		})
		setNumberOfBooksToSkip(0);
		setNumberOfBooksToTake(pageParameter)
	}
	function clearSeearchParams() {
		setSearchParams({})
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
								clearSeearchParams = {clearSeearchParams}
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
									{/* <button
										className="section__pagination-btn"
										onClick={
											() => setNumberOfBooksToSkip((oldNumberOfBooksToSkip) => oldNumberOfBooksToSkip - pageParameter)
										}
										disabled={isDisabledPrevButton}
									>
									</button> */}

									<Link
										onClick={() => setNumberOfBooksToSkip((numberOfBooksToSkip - pageParameter))}
										to={`/catalog-with-url-search?numberOfBooksToSkip=${(numberOfBooksToSkip - pageParameter) < 0 ? 0 : (numberOfBooksToSkip - pageParameter)}${(searchBy && searchString) ? `&searchBy=${searchBy}&searchString=${searchString}` : ''}`}
									>PREV
									</Link>


									<span className="section__pagination-count">
										{currentPageToDisplay} / {Math.ceil(booksCountData / pageParameter)}
									</span>

									{/* <button
										className="section__pagination-btn section__pagination-btn--next"
										onClick={
											() => setNumberOfBooksToSkip((oldNumberOfBooksToSkip) => oldNumberOfBooksToSkip + pageParameter)
										}
										disabled={isDisabledNextButton}
									>
									</button> */}
									<Link
										onClick={() => setNumberOfBooksToSkip((numberOfBooksToSkip + pageParameter))}
										to={`/catalog-with-url-search?numberOfBooksToSkip=${numberOfBooksToSkip + pageParameter}${(searchBy && searchString) ? `&searchBy=${searchBy}&searchString=${searchString}` : ''}`}
									>
										NEXT
									</Link>
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