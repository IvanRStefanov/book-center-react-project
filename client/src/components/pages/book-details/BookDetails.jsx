import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { baseUrl } from "../../../utils/variables";
import FormReview from "../../form-review/FormReview";
import ListReviews from "../../list-reviews/ListReviews";

export default function BookDetails({
  loggedInUser,
  setLoggedInUser,
  postedBooks,
  ratedBooks,
  readBooks
}) {
  const [book, setBook] = useState({});
  const [reviews, setReviews] = useState([]);
  const [isBookOwner, setIsBookOwner] = useState(false);
  const [hasRead, setHasRead] = useState(false);
  const [hasReviewed, sethasReviewed] = useState({});
  const [token, setToken] = useState('');
  const { bookId } = useParams();

  useEffect(() => {
    async function getBookReviews() {
      const response = await fetch(`${baseUrl}/bookComments?where=bookId%3D%22${bookId}%22`);
      const reviewData = await response.json();
      setReviews(reviewData);
    }

    getBookReviews()

    async function bookDetails() {
      const response = await fetch(`${baseUrl}/books/${bookId}`);
      const bookData = await response.json();

      setBook(bookData);
    }

    bookDetails();

    if (loggedInUser) {
    }
  }, [])

  useEffect(() => {
    setIsBookOwner(loggedInUser._id == book._ownerId);
    setHasRead(postedBooks.includes(bookId));
    // sethasReviewed(ratedBooks.includes(bookId));
    sethasReviewed(ratedBooks.find((book) => book.bookId == bookId));
    setToken(loggedInUser.accessToken);

    // ratedBooks.forEach((book) => console.log(book))

    // const hasReviewed = ratedBooks.find((book) => book.bookId == bookId)
    // console.log(hasReviewed)
    // console.log(ratedBooks.includes(bookId))

  }, [loggedInUser])

  function readToggler(e) {
    e.target.disabled = true;
    if (hasRead) {
      setHasRead(false);
      console.log(readBooks)
      const newReads = readBooks.filter(readBookId => readBookId !== bookId);
      console.log(newReads);
      e.target.disabled = false;
    }

    if (!hasRead) {
      setHasRead(true);
      console.log(readBooks)
      const newReads = readBooks.push(bookId);
      console.log(newReads);
      e.target.disabled = false;

    }
    // hasRead ? setHasRead(false) : setHasRead(true);
  }
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

            <div className="section__main-actions">
              <p>Times read: {book.timesRead}</p>

              <button className="btn" onClick={readToggler}>{hasRead ? "Remove from my read list" : "Add to my read list"}</button>
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
                ?
                <ListReviews
                  reviews={reviews}
                  setReviews={setReviews}
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                />
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