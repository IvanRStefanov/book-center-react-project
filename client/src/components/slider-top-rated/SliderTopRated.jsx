import TileBook from "../tile-book/TileBook";

export default function SliderTopRated() {
    return (
        <section className="section-top-rated">
            <div className="shell">
                <header className="section__head">
                    <h2>Top rated books</h2>
                </header>

                <div className="section__items">
                    <div className="section__item">
                        <TileBook />
                    </div>

                    <div className="section__item">
                        <TileBook />
                    </div>

                    <div className="section__item">
                        <TileBook />
                    </div>
                </div>

                <div className="section__actions">
                    <a href="#" className="btn btn--transparent">Show more</a>
                </div>
            </div>
        </section>
    );
}