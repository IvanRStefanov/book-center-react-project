import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { baseUrl } from "../../../utils/variables";
import FormReview from "../../form-review/FormReview";
import SingleBookReview from "../../single-book-review/SingleBookReview";

export default function BookDetails({
  loggedInUser
}) {
  const [book, setBook] = useState({});
  const [reviews, setReviews] = useState([]);
  const { bookId } = useParams();

  const isBookOwner = loggedInUser._id == book._ownerId;
  let hasReviewed = false;

  useEffect(() => {
    async function getBookReviews() {
      const response = await fetch(`${baseUrl}/bookComments?where=bookId%3D%22${bookId}%22`);
      const reviewData = await response.json();
      setReviews(reviewData);
    }

    getBookReviews()

    async function bookDetails() {
      const response = await fetch(`${baseUrl}/books/${bookId}`)
      const bookData = await response.json();
      setBook(bookData)
    }

    bookDetails();
  }, [])

  if (loggedInUser) {
    hasReviewed = loggedInUser.ratedBooks.includes(bookId)
  }
  console.log('has reviewed', hasReviewed)

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

          {loggedInUser && isBookOwner
            ? <div className="section__actions">
              {isBookOwner &&
                <div className="section__owner-actions">
                  <a href="#" className="btn btn--edit">EDIT</a>
                  <a href="#" className="btn btn--delete">DELETE</a>
                </div>
              }
            </div>
            : ''
          }


          <div className="section__comments">
            <div className="section__comments-head">
              <p>Users reviews</p>
            </div>

            <div className="section__comments-list">
              {reviews.length > 0
                ? <ul>{ reviews.map(review => <SingleBookReview
                                                key={review._id}
                                                review={review}
                                                loggedInUser={loggedInUser}
                                              />
                                    )}
                  </ul>
                : <p>no reviews yet be the first!</p>
              }
            </div>

            {!hasReviewed
              ? <div className="section__comment-form">
                <header className="section__comment-form-head">
                  <h6>Write a review</h6>
                </header>

                <div className="section__comment-form-body">
                  <FormReview />
                </div>
              </div>
              : ''
            }
          </div>
        </div>
      </div>
    </section >
  )
}