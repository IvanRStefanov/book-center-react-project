import { Link, useParams } from "react-router-dom";
import { baseUrl } from "../../utils/variables";

import FormReview from "./list-reviews/form-review/FormReview";
import ListReviews from "./list-reviews/ListReviews";
import { useEffect, useState } from "react";

export default function BookDetails({
	loggedInUser,
	updateMyReadBooks
}) {
	const { bookId } = useParams();

	const [book, setBook] = useState({});
	const [totaltimesBookRead, setTotalTimesBookRead] = useState(0);
	const [bookIsRead, setBookIsRead] = useState(false);
	const [readBookCollectionId, setReadBookCollectionId] = useState('');
	const [owner, setOwner] = useState(false);



	useEffect(() => {
		async function setBookAndOwner() {
			try {
				const response = await fetch(`${baseUrl}/books/${bookId}`)
				
				if(response.ok != true) {
					const err = await response.json();
					throw new Error(err.message)
				}

				const bookData = await response.json();
	
				if (loggedInUser._id == bookData._ownerId) {
					setOwner(oldState => !oldState);
				}
	
				setBook(bookData);
				
			} catch (err) {
				console.log(err.message)
			}
		}
		setBookAndOwner();
	}, []);

	useEffect(() => {
		async function getTotalCountBookRead() {
			const response = await fetch(`${baseUrl}/booksRead?where=bookId%3D%22${bookId}%22&count`);
			const data = await response.json();

			setTotalTimesBookRead(data);
		}
		getTotalCountBookRead();
	}, [bookIsRead]);

	useEffect(() => {
		async function getUserReadBookStatus() {
			const response = await fetch(`${baseUrl}/booksRead?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${loggedInUser._id}%22&count`);
			const data = await response.json();

			setBookIsRead(data)
		}
		getUserReadBookStatus();
	}, []);

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

	async function removeBookFromMyReadList() {
		console.log(readBookCollectionId)
		try {
			const response = await fetch(`${baseUrl}/booksRead/${readBookCollectionId}`, {
				method: 'DELETE',
				headers: {
					'X-Authorization': loggedInUser.accessToken
				}
			});

			if (response.ok != true) {
				const err = await response.json();
				const message = err.message;

				throw new Error(message);
			}

			setTotalTimesBookRead(oldCount => oldCount - 1);
			setBookIsRead(0);
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		async function getBookReadCollectionId() {
			const response = await fetch(`${baseUrl}/booksRead?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${loggedInUser._id}%22`);
			const data = await response.json();

			setReadBookCollectionId(data[0]._id);
		}
		getBookReadCollectionId()
	}, []);

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

						</header>

						<div className="section__body">
							<p><strong>Author:</strong></p>

							<p>&nbsp;&nbsp;&nbsp;{book.author}</p>

							<p><strong>Book description: </strong></p>

							<p>&nbsp;&nbsp;&nbsp;{book.description}</p>
						</div>

						<div className="section__main-actions">
							<p><strong>This book has been read by:</strong> {totaltimesBookRead} user{totaltimesBookRead != 1 ? 's' : ''}</p>



							{(loggedInUser && !bookIsRead) &&
								< button className="btn" onClick={addBookToMyReadList}>
									Add to my read list
								</button>
							}
						</div>
					</div>

					{(loggedInUser && owner) &&
						(<div className="section__actions">
							<div className="section__owner-actions">
								<button className="btn btn--edit">EDIT</button>
								<button href="#" className="btn btn--delete">DELETE</button>
							</div>
						</div>)
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
	)
}