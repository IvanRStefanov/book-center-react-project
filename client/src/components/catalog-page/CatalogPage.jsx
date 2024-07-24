import { useEffect, useState } from "react";
import TileBook from "../tile-book/TileBook";
import { baseUrl } from "../../utils/variables";

export default function CatalogPage() {

	const [books, setBooksData] = useState([]);
	useEffect(() => {
		async function getAllBooks() {
			const response = await fetch(`${baseUrl}/books`);
			const data = await response.json();
			setBooksData(data);
		}

		getAllBooks();
	}, [])

	return (
		<section className={books.length > 0 ? "section-catalog" : "section-catalog section-catalog--empty"}>
			<div className="shell">
				<div className="section__inner">
					{books.length > 0
						?
						<>
							<div className="section__aside">

							</div>

							<div className="section__main">
								<div className="section__items">
									{books.map(book =>
										<div className="section__item" key={book._id}>
											<TileBook book={book} className="tile-book tile-book--catalog" />
										</div>
									)}
								</div>
							</div>
						</>
						:
						<div className="section__empty">
							<p>There are no books currently.</p>
						</div>
					}
				</div>
			</div>
		</section>
	);
}