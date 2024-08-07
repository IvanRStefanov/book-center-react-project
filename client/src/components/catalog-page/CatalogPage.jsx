import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useLocation, useSearchParams } from "react-router-dom";
import * as qs from 'qs';

import { getAllBooksPaginatedWithSearchOption, getTotalBookCount } from "../../services/booksService";
import TileBook from "../tile-book/TileBook";
import CatalogSearch from "./catalog-search/CatalogSearch";

export default function Catalog() {
	const pageParameter = 12;

	const location = useLocation();
	const [searchParams, setSearchParams] = useSearchParams()

	const querySearchFromUrl = qs.parse(location.search.slice(1));
	const {
		searchBy,
		searchString,
		numberOfBooksToSkip,
		...restProps
	} = {
		...querySearchFromUrl,
		searchBy: querySearchFromUrl.searchBy || '',
		searchString: querySearchFromUrl.searchString || '',
		numberOfBooksToSkip: Number(querySearchFromUrl.numberOfBooksToSkip) || 0,
	}

	async function getBooks(skip = 0, take = pageParameter, searchBy = '', searchString = '') {
		const books = getAllBooksPaginatedWithSearchOption(skip, take, searchBy, searchString);

		return books;
	}

	const {
		isPending: isPendingBooksPaginatedData,
		data: booksPaginatedData,
		error: booksPaginatedError,
	} = useQuery({
		queryKey: ['books-paginated', location, searchBy, searchString, numberOfBooksToSkip],
		queryFn: () => getBooks(numberOfBooksToSkip, pageParameter, searchBy, searchString),
	});

	const {
		isPending: isPendingBooksCount,
		data: booksCountData,
		error: booksCountError,
	} = useQuery({
		queryKey: ['books-count', location, searchBy, searchString],
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
		setSearchParams({
			numberOfBooksToSkip: 0,
			...data
		})
	}
	function clearSeearchParams() {
		setSearchParams({})
	}

	const numberOfPagesToDisplay = Math.ceil(booksCountData / pageParameter);
	const currentPageToDisplay = (numberOfBooksToSkip / pageParameter) + 1;
	const prevPageSkipCount = numberOfBooksToSkip - pageParameter;
	const nextPageSkipCount = numberOfBooksToSkip + pageParameter;
	const hasSearchInputs = ((searchBy != '') || (searchString != ''));

	return (
		<section className="section-catalog">
			<div className="shell">
				<div className="section__inner">
					<div className="section__aside">
						<div className="section__aside-search">
							<CatalogSearch
								submitSearchHandler={submitSearchHandler}
								searchBy={searchBy}
								searchString={searchString}
								clearSeearchParams={clearSeearchParams}
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
									{(prevPageSkipCount >= 0) &&
										<Link
											className="section__pagination-btn"
											to={`/catalog?numberOfBooksToSkip=${prevPageSkipCount}${hasSearchInputs ? `&searchBy=${searchBy}&searchString=${searchString}` : ''}`}
										/>
									}



									<span className="section__pagination-count">
										{currentPageToDisplay} / {numberOfPagesToDisplay}
									</span>

									{(nextPageSkipCount < booksCountData) &&
										<Link
											className="section__pagination-btn section__pagination-btn--next"
											to={`/catalog?numberOfBooksToSkip=${nextPageSkipCount}${hasSearchInputs ? `&searchBy=${searchBy}&searchString=${searchString}` : ''}`}
										/>
									}

								</div>
							</>
							:
							<div className="section__empty">
								{searchBy
									? <p>There are no posted books matching your search
										<br></br>
										<em><strong>{searchBy}</strong></em> as <em><strong>{searchString}</strong></em>
									</p>
									: <p>There are no posted books yet.</p>
								}
							</div>
						}
					</div>
				</div>
			</div>
		</section >
	);
}