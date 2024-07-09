export default function CardTestimonial({testimonial}) {
    return (
        <div className="card-testimonial" >
            <blockquote className="card__body">
                <p>{testimonial.text}</p>

                <footer>
                    - {testimonial.firstName} {testimonial.lastName}
                </footer>
            </blockquote>
        </div>
    );
}