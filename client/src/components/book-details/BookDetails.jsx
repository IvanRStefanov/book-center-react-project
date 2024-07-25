import { Link, useNavigate, useParams } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { addBookToUserReadList, getTotalCountBookHasBeenRead } from "../../services/readBooksService";
import { deleteBook, deleteBookFromOtherCollectionsAsAdmin, getSingleBook } from "../../services/booksService";
import { showBodyScroll } from "../../utils/utils";
import { getBookReviewsById } from "../../services/reviewBookSService";

import UserContext from "../../contexts/UserContext";

import ListReviews from "./list-reviews/ListReviews";
import FormReview from "./form-review/FormReview";
import ModalDelete from "./modal-delete/ModalDelete";
import BookDetailsOwnerInfo from "./book-details-owner-info/BookDetailsOwnerInfo";

export default function BookDetails() {
	const navigate = useNavigate();
	const UserCTX = useContext(UserContext)

	const { bookId } = useParams();

	const [book, setBook] = useState({});
	const [isDeleting, setIsDeleting] = useState(false);
	const [totaltimesBookRead, setTotalTimesBookRead] = useState(0);
	const [bookIsRead, setBookIsRead] = useState(false);
	const [alertDeleteBook, setAlertDeleteBook] = useState(false);
	const [bookReviews, setBookReviews] = useState([]);

	const hasRead = UserCTX.readBooks.findIndex(book => (book.bookId == bookId)) >= 0;
	const isOwner = UserCTX.postedBooks.findIndex(book => (book._id === bookId)) >= 0;
	const hasReviewed = UserCTX.reviewedBooks.findIndex(book => (book.bookId === bookId)) >= 0;

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
		console.log(book)
		try {
			await addBookToUserReadList(bookId, book.imgUrl);

			setTotalTimesBookRead(oldCount => oldCount + 1);
			UserCTX.updateReadBooks();
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
		setIsDeleting(oldState => !oldState);
		await deleteBookFromOtherCollectionsAsAdmin(bookId);
		await deleteBook(bookId);
		setIsDeleting(oldState => !oldState);
		showBodyScroll(true);
		UserCTX.updatePostedBooks();
		UserCTX.updateReadBooks();
		UserCTX.updateReviews();

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
					isDeleting={isDeleting}
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

								{(UserCTX.user && !isOwner && !hasRead) &&
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
									<Link to={`/catalog/${bookId}/edit`} className="btn btn--edit">EDIT</Link>
									<button className="btn btn--delete" onClick={showAlertDeleteBook}>DELETE</button>
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
										updateBookReviewList={updateBookReviewList}
									/>
									: <p>no reviews yet be the first!</p>
								}
							</div>
							{(!hasReviewed && UserCTX.user)
								? <div className="section__comment-form">
									<div className="section__comment-form-head">
										<h6>Write a review</h6>
									</div>
									
									<div className="section__comment-form-body">
										<FormReview
											bookId={bookId}
											book={book}
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