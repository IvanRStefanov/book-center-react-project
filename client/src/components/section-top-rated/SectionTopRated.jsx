// import TileBook from "../tile-book/TileBook";
import SliderTopRated from "./slider-top-rated/SliderTopRated";
// import { baseUrl } from '../../utils/utils.js';


export default function SectionTopRated() {
    return (
        <section className="section-top-rated">
            <div className="shell">
                <header className="section__head">
                    <h2>Top rated books</h2>
                </header>

                <div className="section__slider">
                    <SliderTopRated />
                </div>

                <div className="section__actions">
                    <a href="#" className="btn btn--transparent">Show more</a>
                </div>
            </div>
        </section>
    );
}