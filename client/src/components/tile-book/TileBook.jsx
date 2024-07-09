export default function TileBook() {
    return (
        <div className="tile-book">
            <div className="tile__img image-fit">
                <img src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1659905828i/7235533.jpg"
                    alt=""></img>
            </div>

            <div className="tile__content">
                <div className="tile__body">
                    <h5><a href="#">The Way of Kings (The stormlight Archive, #1)</a></h5>

                    <p>by <span><a href="#">Brandon Sanderson</a></span></p>
                </div>

                <div className="tile__rating">
                    <div className="tile__stars-outer">
                        <div className="tile__stars-inner" style={{"--average": 4.5}}></div>

                    </div>
                </div>

                <div className="tile__price">
                    <span>45.00</span>
                </div>
            </div>
        </div>
    );
}