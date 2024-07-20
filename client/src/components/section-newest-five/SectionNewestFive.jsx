import SliderNewestFive from "./slider-newest-five/SliderNewestFive";


export default function SectionNewestFive() {
    return (
        <section className="section-top-rated">
            <div className="shell">
                <header className="section__head">
                    <h2>Reacently added</h2>
                </header>

                <div className="section__slider">
                    <SliderNewestFive />
                </div>

                <div className="section__actions">
                    <a href="#" className="btn btn--transparent">Show more</a>
                </div>
            </div>
        </section>
    );
}