import TestimonialSlider from "../testimonials-slider/TestimonialsSlider";
import styles from './SectionTestimonials.module.scss'

export default function SectionTestimonials() {
    return (
        <section className={styles['section-testimonials']}>
            <div className={styles['section__bg']} style={{backgroundImage: "url('.././src/assets/images/book-shelf.jpeg')"}}></div>

            <div className={styles["section__content"]}>
                <div className={styles["section__content-wrapper"]}>
                    <div className={styles["section__shell"]}>
                        <TestimonialSlider />
                    </div>
                </div>
            </div>
        </section>
    );
}