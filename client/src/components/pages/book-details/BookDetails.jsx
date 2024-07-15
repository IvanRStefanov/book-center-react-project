import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { baseUrl } from "../../../utils/variables";

export default function BookDetails() {
  const [book, setBook] = useState({});
  const [reviews, setReviews] = useState([]);
  const { bookId } = useParams();


  useEffect(() => {
    async function bookDetails() {
      const response = await fetch(`${baseUrl}/books/${bookId}`)
      const bookData = await response.json();
      setBook(bookData)
    }

    bookDetails();

  }, []);

  useEffect(() => {
    async function getBookReviews() {
      const response = await fetch(`${baseUrl}/bookComments?where=bookId%3D%22${bookId}%22`);
      const reviewData = await response.json();
      setReviews(reviewData);
    }

    getBookReviews()
  }, [])

  return (
    <section className="section-details">
      <div className="shell">
        <div className="section__inner">
          <div className="section__media">
            <div className="section__img image-fit">
              <img src={book.imgUrl} alt={`${book.name} cover`} />

              <span className="section__img-loading-spinner"></span>
            </div>
          </div>

          <div className="section__main">
            <header className="section__title">
              <h1 className="section__head">{book.name}</h1>

              <p className="section__sub-head">by <Link>{book.author}</Link></p>
            </header>

            <div className="section__body">
              <p>{book.description}</p>
            </div>

            <div className="section__info-rating">
              <div className="section__rating">
                <div className="section__rating-outer" title={`Readers rating: ${book.averageRating}`}>
                  <div className="section__rating-inner" style={{ "--average": book.averageRating }}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="section__actions">
            <div className="section__owner-actions">
              <a href="#" className="btn btn--edit">EDIT</a>
              <a href="#" className="btn btn--delete">DELETE</a>
            </div>

            <div className="section__comments">
              <div className="section__comments-head">
                <p>Users reviews</p>
              </div>

              <div className="section__comments-list">
                <ul>
                  {reviews.map(review =>
                    <li key={review._id}>
                      <p>
                        {review.comment}
                      </p>

                      <p>
                        - {review.username}
                      </p>
                    </li>
                  )}
                </ul>
              </div>

              <div className="section__comment-form">
                <header className="section__comment-form-head">
                  <h6>Write a review</h6>
                </header>

                <div className="section__comment-form-body">
                  <div className="form form--review">
                    <form action="">
                      <div className="form__body">
                        <div className="form__row">
                          <div className="form__row-head">
                            Your rating:
                          </div>
                          <div className="form__radios star-rating">
                            <input type="radio" name="rated" className="star" value={5} id="five" />
                            <label htmlFor="five" title="Loved it!">&#9734;</label>

                            <input type="radio" name="rated" className="star" value={4} id="four" />
                            <label htmlFor="four" title="Liked it.">&#9734;</label>

                            <input type="radio" name="rated" className="star" value={3} id="three" />
                            <label htmlFor="three" title="It was ok.">&#9734;</label>

                            <input type="radio" name="rated" className="star" value={2} id="two" />
                            <label htmlFor="two" title="Didn't like it.">&#9734;</label>

                            <input type="radio" name="rated" className="star" value={1} id="one" />
                            <label htmlFor="one" title="Hated it!">&#9734;</label>
                          </div>
                        </div>

                        <div className="form__row">
                          <label htmlFor="comment" className="form__label">Describe your reading experience</label>
                          <div className="form__controls">
                            <textarea name="comment" id="comment" className="textarea"></textarea>
                          </div>
                        </div>
                      </div>

                      <div className="form__actions">
                        <input type="submit" value="submit" className="form__btn" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}