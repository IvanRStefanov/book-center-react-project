import { Link, useLocation } from "react-router-dom";

export default function TileBook({
	book
}) {
	const location = useLocation();
	const pathname = location.pathname;
	let classes = 'tile-book';

	if (pathname == '/catalog') {
		classes = classes + ' tile-book--catalog';
	} else if (pathname == '/my-account/my-published-books') {
		classes = classes + ' tile-book--xtra-small';
	}

	return (
		<div className={classes}>
			<div className="tile__img image-fit">
				<Link to={`/catalog/${book._id}`}/>
				<img src={book.imgUrl} alt={`${book.name} cover`}></img>

				<span className="tile__img-loading-spinner"></span>
			</div>

			<div className="tile__content">
				<div className="tile__body">
					<h5 className="tile__head">
						<Link to={`/catalog/${book._id}`}>{book.name}</Link>
					</h5>

					<p className="tile__author">Author: {book.author}</p>
				</div>
			</div>

			<div className="tile__price">
				<p><sup>&#36;</sup>{parseFloat(book.price).toFixed(2)}</p>
			</div>
		</div>
	);
}