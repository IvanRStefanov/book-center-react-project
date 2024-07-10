export default function TileBook({ book }) {
	return (
		<div className="tile-book">
			<div className="tile__img image-fit">
				<img src={book.imgUrl} alt=""></img>
			</div>

			<div className="tile__content">
				<div className="tile__body">
					<h5 className="tile__head"><a href="#">{book.name}</a></h5>

					<p className="tile__author">by <span><a href="#">{book.author}</a></span></p>
				</div>


			</div>

			<div className="tile__bar">
				<div className="tile__rating">
					<div className="tile__stars-outer">
						<div className="tile__stars-inner" style={{ "--average": book.averageRating }} title={`Readers rating: ${book.averageRating}`}></div>
					</div>
				</div>

				<div className="tile__price">
					<p><sup>&#36;</sup>{book.price}</p>
				</div>
			</div>
		</div>
	);
}