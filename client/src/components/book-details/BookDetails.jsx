import { Link, useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { addBookToUserReadList, getTotalCountBookHasBeenRead } from "../../services/readBooksService";
import { deleteBook, getSingleBook } from "../../services/booksService";
import { showBodyScroll } from "../../utils/utils";
import { deleteUserReview, getBookReviewsById } from "../../services/reviewBookSService";

import ListReviews from "./list-reviews/ListReviews";
import FormReview from "./form-review/FormReview";
import ModalDelete from "./modal-delete/ModalDelete";
import BookDetailsOwnerInfo from "./book-details-owner-info/BookDetailsOwnerInfo";

export default function BookDetails({
	loggedInUser,
	updateUserReadBooks,
	userReadBooks,
	updateUserPostedBooks,
	userPostedBooks,
	updateUserReviewedBooks,
	userReviewedBooks,
}) {
	const navigate = useNavigate();

	const { bookId } = useParams();

	const [book, setBook] = useState({});
	const [totaltimesBookRead, setTotalTimesBookRead] = useState(0);
	const [bookIsRead, setBookIsRead] = useState(false);
	const [alertDeleteBook, setAlertDeleteBook] = useState(false);
	const [bookReviews, setBookReviews] = useState([]);

	const hasRead = userReadBooks.findIndex(book => (book.bookId == bookId)) >= 0;
	const isOwner = userPostedBooks.findIndex(book => (book._id === bookId)) >= 0;
	const hasReviewed = userReviewedBooks.findIndex(book => (book.bookId === bookId)) >= 0;


	useEffect(() => {
		async function getBook() {
			const bookData = await getSingleBook(bookId);

			setBook(bookData);
		}
		getBook();

		async function bookReviews() {
			try {
				const response = await getBookReviewsById(bookId);
				setBookReviews(response);
			} catch (error) {
				console.log(error)
			}
		}
		bookReviews();
	}, []);

	useEffect(() => {
		async function getTotalCountBookRead() {
			try {
				const response = await getTotalCountBookHasBeenRead(bookId);

				setTotalTimesBookRead(response);
			} catch (error) {
				console.log(error);
			}
		}
		getTotalCountBookRead();
	}, [bookIsRead]);

	async function addBookToMyReadListClickHandler() {
		try {
			await addBookToUserReadList(bookId);

			setTotalTimesBookRead(oldCount => oldCount + 1);
			updateUserReadBooks();
			setBookIsRead(oldState => !oldState);
		} catch (error) {
			console.log(error)
		}
	}

	function showAlertDeleteBook() {
		setAlertDeleteBook(oldState => !oldState);
		showBodyScroll(false);
	}

	function hideAlertDeleteBook() {
		setAlertDeleteBook(oldState => !oldState);
		showBodyScroll(true);
	}

	async function deleteBookHandler() {
		await deleteBook(bookId);
		showBodyScroll(true);
		updateUserPostedBooks();

		navigate('/my-account/my-published-books');
	}

	async function updateBookReviewList() {
		try {
			const response = await getBookReviewsById(bookId);
			setBookReviews(response);
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			{alertDeleteBook &&
				<ModalDelete
					book={book}
					deleteBookHandler={deleteBookHandler}
					hideAlertDeleteBook={hideAlertDeleteBook}
				/>
			}

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
							</header>

							<div className="section__body">
								<p>
									<strong>Author:</strong>

									<br></br>

									&nbsp;&nbsp;&nbsp;{book.author}
								</p>

								<p>
									<strong>Book description: </strong>

									<br></br>

									&nbsp;&nbsp;&nbsp;{book.description}
								</p>

								<p className="section__price">
									<strong>Price:</strong>&nbsp; <sup>&#36;</sup>{book.price}
								</p>
							</div>

							<div className="section__main-actions">
								<p><strong>This book has been read by:</strong>&nbsp;&nbsp;{totaltimesBookRead} user{totaltimesBookRead != 1 ? 's' : ''}</p>

								{(loggedInUser && !isOwner && !hasRead) &&
									< button className="btn" onClick={addBookToMyReadListClickHandler}>
										Add to my read list
									</button>
								}
							</div>

							<BookDetailsOwnerInfo book={book} />
						</div>

						{isOwner &&
							<div className="section__actions">
								<div className="section__owner-actions">
									<button className="btn btn--edit">EDIT</button>
									<button href="#" className="btn btn--delete" onClick={showAlertDeleteBook}>DELETE</button>
								</div>
							</div>
						}


						<div className="section__comments">
							<div className="section__comments-head">
								<p><u>Users reviews: </u></p>
							</div>

							<div className="section__comments-list">
								{bookReviews.length > 0
									?
									<ListReviews
										bookReviews={bookReviews}
										userReviewedBooks={userReviewedBooks}
										loggedInUser={loggedInUser}
										updateUserReviewedBooks={updateUserReviewedBooks}
										updateBookReviewList={updateBookReviewList}
									/>
									: <p>no reviews yet be the first!</p>
								}
							</div>
							{(!hasReviewed && loggedInUser)
								? <div className="section__comment-form">
									<header className="section__comment-form-head">
										<h6>Write a review</h6>
									</header>
									<div className="section__comment-form-body">
										<FormReview
											bookId={bookId}
											book={book}
											loggedInUser={loggedInUser}
											updateUserReviewedBooks={updateUserReviewedBooks}
											updateBookReviewList={updateBookReviewList}
										/>
									</div>
								</div>
								: ''
							}
						</div>
					</div>
				</div>
			</section >
		</>
	)
}