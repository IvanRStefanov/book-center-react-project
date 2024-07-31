import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllBooks, searchBookByName } from "../../services/booksService";

import TileBook from "../tile-book/TileBook";

export default function CatalogPage() {
	const { isPending, data: books, error } = useQuery({
		queryKey: ['books-catalog'],
		queryFn: async () => {
			return await getAllBooks()
		}
	})

	if (error) {
		console.error(error.message)
	}

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
						<>
							{error
								? error.message == 'Failed to fetch'
									?
										<div className="section__empty">
											<p className='error-msg'>We are having technical issues, try again later</p>
										</div>
									:
										<div className="section__empty">
											<p className='error-msg'>Something went wrong, please try again later</p>
										</div>
								: isPending
									?
										<div className="section__loading"></div>
									:
										books.length > 0
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
													<p>There are no posted books yet.</p>
												</div>
							}
						</>
					</div>
				</div>
			</div>
		</section >
	);
}