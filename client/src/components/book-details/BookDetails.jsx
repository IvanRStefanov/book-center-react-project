import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { addBookToUserReadList, getTotalCountBookHasBeenRead, getUserReadBooks } from "../../services/readBooksService";
import { deleteBook, deleteBookFromOtherCollectionsAsAdmin, getSingleBook } from "../../services/booksService";
import { showBodyScroll } from "../../utils/utils";
import { getBookReviewsById, getUserReviewedBooks } from "../../services/reviewBookSService";

import { UserContext } from "../../contexts/UserContext";

import ListReviews from "./list-reviews/ListReviews";
import FormReview from "./form-review/FormReview";
import ModalDelete from "./modal-delete/ModalDelete";
import BookDetailsOwnerInfo from "./book-details-owner-info/BookDetailsOwnerInfo";

export default function BookDetails() {
	const navigate = useNavigate();
	const UserCTX = useContext(UserContext);
	const userId = UserCTX.user._id;

	const { bookId } = useParams();

	const [book, setBook] = useState({});
	const [isDeleting, setIsDeleting] = useState(false);
	const [totaltimesBookRead, setTotalTimesBookRead] = useState(0);
	const [bookIsRead, setBookIsRead] = useState(false);
	const [alertDeleteBook, setAlertDeleteBook] = useState(false);
	const [bookReviews, setBookReviews] = useState([]);

	const {
		isFetching: isFetchingBookData,
		data: bookData,
		error: bookDataError,
	} = useQuery({
		queryKey: ['singleBook'],
		queryFn: async () => {
			const bookObject = await getSingleBook(bookId);
			if (bookObject.code === 404) {
				console.error(bookDataError.message)
				return Promise.reject('Resource not found!')
			}
			return bookObject;
		}
	});
	// console.log(remainingProps);

	let isOwner = false;
	if (!isFetchingBookData) {
		// console.log(bookDataError)
		isOwner = bookData._ownerId == userId;
	}

	const {
		isFetching: isFetchingHasUserReadData,
		data: hasUserReadData,
	} = useQuery({
		queryKey: ['hasUserRead'],
		queryFn: () => getUserReadBooks(userId)
	})

	let hasRead = false;
	if (!isFetchingHasUserReadData) {
		hasRead = hasUserReadData.findIndex(book => (book.bookId == bookId)) >= 0
	}

	const {
		isFetching: isFetchingHasUserReviewedData,
		data: hasUserReviewedData,
	} = useQuery({
		queryKey: ['hasUserReviewed'],
		queryFn: () => getUserReviewedBooks(userId),
	});

	let hasReviewed = false;
	if (!isFetchingHasUserReviewedData) {
		hasReviewed = hasUserReviewedData.findIndex(review => (review.bookId == bookId)) >= 0;
	}

	const {
		isFetching: isFetchingBookReviewsData,
		data: bookReviewsData
	} = useQuery({
		queryKey: ['bookReviews'],
		queryFn: () => getBookReviewsById(bookId),
	})
	// console.log(hasReviewed)

	// useEffect(() => {
	// 	async function getBook() {
	// 		const bookData = await getSingleBook(bookId);

	// 		setBook(bookData);
	// 	}
	// 	getBook();

	// 	async function bookReviews() {
	// 		try {
	// 			const response = await getBookReviewsById(bookId);
	// 			setBookReviews(response);
	// 		} catch (error) {
	// 			console.log(error)
	// 		}
	// 	}
	// 	bookReviews();
	// }, []);

	// useEffect(() => {
	// 	async function getTotalCountBookRead() {
	// 		try {
	// 			const response = await getTotalCountBookHasBeenRead(bookId);

	// 			setTotalTimesBookRead(response);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	}
	// 	getTotalCountBookRead();
	// }, [bookIsRead]);

	async function addBookToMyReadListClickHandler() {
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
					book={bookId}
					isDeleting={isDeleting}
					deleteBookHandler={deleteBookHandler}
					hideAlertDeleteBook={hideAlertDeleteBook}
				/>
			}

			<section className="section-details">
				<div className="shell">
					<div className="section__inner">
						{isFetchingBookData
							? <div className="loading-spinner"></div>
							: bookDataError
								? <Navigate to={'/error-page'} />
								: <>
									<div className="section__media">
										<div className="section__img image-fit">
											<img src={bookData.imgUrl} alt={`${bookData.name} cover`} />

											<span className="section__img-loading-spinner"></span>
										</div>
									</div>

									<div className="section__main">
										<header className="section__title">
											<h1 className="section__head">{bookData.name}</h1>
										</header>

										<div className="section__body">
											<p>
												<strong>Author:</strong>

												<br></br>

												&nbsp;&nbsp;&nbsp;{bookData.author}
											</p>

											<p>
												<strong>Book description: </strong>

												<br></br>

												&nbsp;&nbsp;&nbsp;{bookData.description}
											</p>

											<p className="section__price">
												<strong>Price:</strong>&nbsp; <sup>&#36;</sup>{parseFloat(bookData.price).toFixed(2)}
											</p>
										</div>

										{bookData.genre &&
											<div className="section__list">
												<div className="section__list-head">
													<p>Genres: </p>
												</div>

												<ul>
													{bookData.genre.map((genre, index) =>
														<li key={genre}>
															{genre}{(index == (bookData.genre.length - 1)) ? '' : ','}
														</li>
													)}
												</ul>
											</div>
										}

										<div className="section__main-actions">
											<p><strong>This book has been read by:</strong>&nbsp;&nbsp;{totaltimesBookRead} user{totaltimesBookRead != 1 ? 's' : ''}</p>

											{(UserCTX.user && !isOwner && !hasRead) &&
												< button className="btn" onClick={addBookToMyReadListClickHandler}>
													Add to my read list
												</button>
											}
										</div>

										<BookDetailsOwnerInfo book={bookData} />
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
											{
												isFetchingBookReviewsData
													? <div className="loading-text"></div>
													:
													bookReviewsData.length > 0
														?
														<ListReviews
															bookReviews={bookReviewsData}
															updateBookReviewList={updateBookReviewList}
														/>
														: <p>No reviews yet{UserCTX.user ? ' be the first!' : '!'}</p>
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
								</>
						}
					</div>
				</div>
			</section >
		</>
	)
}