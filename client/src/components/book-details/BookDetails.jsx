import { Link, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../utils/variables";

import FormReview from "./list-reviews/form-review/FormReview";
import ListReviews from "./list-reviews/ListReviews";
import { useEffect, useState } from "react";
import { readByUserStatus } from "../../services/readBooksService";
import { deleteBook, getSingleBook } from "../../services/booksService";
import { showBodyScroll } from "../../utils/utils";
import ModalDelete from "./modal-delete/ModalDelete";

export default function BookDetails({
	loggedInUser,
	updateMyReadBooks,
	updateMyPostedBooks
}) {
	const { bookId } = useParams();

	const [book, setBook] = useState({});
	const [totaltimesBookRead, setTotalTimesBookRead] = useState(0);
	const [bookIsRead, setBookIsRead] = useState(false);
	const [readBookCollectionId, setReadBookCollectionId] = useState('');
	const [owner, setOwner] = useState(false);
	const [alertDeleteBook, setAlertDeleteBook] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {

		async function getBookAndCheckOwner() {

			const bookData = await getSingleBook(bookId);

			setBook(bookData);

			if (loggedInUser._id == bookData._ownerId) {
				setOwner(oldState => !oldState);
			}
		}
		getBookAndCheckOwner();

		async function getUserReadBookStatus() {
			if (loggedInUser) {
				const response = await fetch(`${baseUrl}/booksRead?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${loggedInUser._id}%22&count`);
				const data = await response.json();
				console.log(await readByUserStatus(book._id, loggedInUser._id));

				setBookIsRead(data)
			}
		}
		getUserReadBookStatus();


		async function getBookReadCollectionId() {
			if (loggedInUser) {

				const response = await fetch(`${baseUrl}/booksRead?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${loggedInUser._id}%22`);
				const data = await response.json();

				setReadBookCollectionId(data[0]._id);
			}
		}
		getBookReadCollectionId()
	}, []);

	useEffect(() => {
		async function getTotalCountBookRead() {
			const response = await fetch(`${baseUrl}/booksRead?where=bookId%3D%22${bookId}%22&count`);
			const data = await response.json();

			setTotalTimesBookRead(data);
		}
		getTotalCountBookRead();
	}, [bookIsRead]);

	async function addBookToMyReadList() {
		try {
			const response = await fetch(`${baseUrl}/booksRead`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-Authorization': loggedInUser.accessToken
				},
				body: JSON.stringify({ bookId })
			});

			if (response.ok != true) {
				const err = await response.json();
				const message = err.message;

				throw new Error(message);
			}

			const data = await response.json();

			setTotalTimesBookRead(oldCount => oldCount + 1);
			updateMyReadBooks();
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
		updateMyPostedBooks();

		navigate('/catalog');
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
								<p><strong>Author:</strong></p>

								<p>&nbsp;&nbsp;&nbsp;{book.author}</p>

								<p><strong>Book description: </strong></p>

								<p>&nbsp;&nbsp;&nbsp;{book.description}</p>
							</div>

							<div className="section__main-actions">
								<p><strong>This book has been read by:</strong> {totaltimesBookRead} user{totaltimesBookRead != 1 ? 's' : ''}</p>



								{(!owner && !bookIsRead) &&
									< button className="btn" onClick={addBookToMyReadList}>
										Add to my read list
									</button>
								}
							</div>
						</div>

						{(loggedInUser && owner) &&
							<div className="section__actions">
								<div className="section__owner-actions">
									<button className="btn btn--edit">EDIT</button>
									<button href="#" className="btn btn--delete" onClick={showAlertDeleteBook}>DELETE</button>
								</div>
							</div>
						}


						{/* <div className="section__comments"> */}
						{/* <div className="section__comments-head">
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
									deleteReviewStateHandler={deleteReviewStateHandler}
								/>
								: <p>no reviews yet be the first!</p>
							}
						</div> */}
						{/* {!hasReviewed && isUser */}
						{/* ? <div className="section__comment-form"> */}
						{/* <header className="section__comment-form-head"> */}
						{/* <h6>Write a review</h6> */}
						{/* </header> */}
						{/* {console.log(isVisiblePostReviewForm)} */}
						{/* <div className="section__comment-form-body"> */}
						{/* <FormReview /> */}
						{/* </div> */}
						{/* </div> */}
						{/* : '' */}
						{/* } */}
						{/* </div> */}
					</div>
				</div>
			</section >
		</>
	)
}