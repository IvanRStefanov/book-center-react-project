import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { addBookToUserReadList, getTotalCountBookHasBeenRead, getUserReadBooks } from "../../services/readBooksService";
import { deleteBook, deleteBookFromOtherCollectionsAsAdmin, getSingleBook } from "../../services/booksService";
import { showBodyScroll } from "../../utils/utils";
import { createUserReview, getBookReviewsById, getUserReviewedBooks } from "../../services/reviewBookSService";

import { UserContext } from "../../contexts/UserContext";

import ListReviews from "./list-reviews/ListReviews";
import FormReview from "./form-review/FormReview";
import ModalDelete from "./modal-delete/ModalDelete";
import BookDetailsOwnerInfo from "./book-details-owner-info/BookDetailsOwnerInfo";

export default function BookDetails() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const UserCTX = useContext(UserContext);
	const userId = UserCTX.user._id;

	const { bookId } = useParams();

	const [alertDeleteBook, setAlertDeleteBook] = useState(false);

	const {
		isLoading: isLoadingBookData,
		error: bookDataError,
		data: bookData,
	} = useQuery({
		queryKey: ['singleBook'],
		queryFn: async () => {
			const bookObject = await getSingleBook(bookId);
			if (bookObject.code === 404) {
				console.error(bookDataError.message)
				return Promise.reject('Resource not found!')
			}
			return bookObject;
		},
		refetchOnMount: "always"
	});

	const {
		isLoading: isLoadingUserReadBooksData,
		error: userReadBooksDataError,
		data: userReadBooksData,
	} = useQuery({
		queryKey: ['userReadBooks', bookId],
		queryFn: async () => getUserReadBooks(userId)
	})

	const {
		isLoading: isLoadingUserReviewedBooksData,
		error: userReviewedBooksDataError,
		data: userReviewedBooksData,
	} = useQuery({
		queryKey: ['userReviewedBooks', bookId],
		queryFn: () => getUserReviewedBooks(userId),
	});

	const {
		isLoading: isLoadingBookReadCount,
		error: bookReadCountError,
		data: bookReadCountData,
	} = useQuery({
		queryKey: ['bookReadCount'],
		queryFn: () => getTotalCountBookHasBeenRead(bookId)
	})

	const {
		isLoading: isLoadingBookReviewsData,
		error: bookReviewsError,
		data: bookReviewsData,
	} = useQuery({
		queryKey: ['bookReviews'],
		queryFn: () => getBookReviewsById(bookId)
	})

	const deleteBookMutation = useMutation({
		mutationFn: async () => {
			await deleteBookFromOtherCollectionsAsAdmin(bookId);
			await deleteBook(bookId);
			showBodyScroll(true);
			navigate('/my-account/my-published-books');
		}
	})

	const markBookAsReadMutation = useMutation({
		mutationFn: async () => {
			await addBookToUserReadList(bookId, bookData.imgUrl);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['bookReadCount'] })
			queryClient.invalidateQueries({ queryKey: ['userReadBooks', bookId] })
		}
	});

	if (isLoadingBookData
		|| isLoadingUserReadBooksData
		|| isLoadingUserReviewedBooksData
		|| isLoadingBookReadCount
		|| isLoadingBookReviewsData
	) {
		return (
			<div className="section-details">
				<div className="shell">
					<div className="section__inner">
						<div className="loading-spinner"></div>
					</div>
				</div>
			</div>
		)
	}

	if (bookDataError
		|| userReadBooksDataError
		|| userReviewedBooksDataError
		|| bookReadCountError
		|| bookReviewsError
	) {
		return (
			<Navigate to={'/error-page'} />
		)
	}

	const isOwner = bookData._ownerId === userId;
	const hasRead = userReadBooksData.findIndex(book => (book.bookId == bookId)) >= 0;
	const hasReviewed = userReviewedBooksData.findIndex(review => (review.bookId == bookId)) >= 0;

	console.log(`isOwner: ${isOwner}, hasRead: ${hasRead}, hasReviewed: ${hasReviewed}`)

	function showAlertDeleteBook() {
		setAlertDeleteBook(oldState => !oldState);
		showBodyScroll(false);
	}

	function hideAlertDeleteBook() {
		setAlertDeleteBook(oldState => !oldState);
		showBodyScroll(true);
	}

	return (
		<>
			{alertDeleteBook &&
				<ModalDelete
					book={bookData}
					deleteBookMutation={deleteBookMutation}
					hideAlertDeleteBook={hideAlertDeleteBook}
				/>
			}

			<section className="section-details">
				<div className="shell">
					<div className="section__inner">
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
								<p><strong>This book has been read by:</strong>&nbsp;&nbsp;{bookReadCountData} user{bookReadCountData != 1 ? 's' : ''}</p>

								{(UserCTX.user && !isOwner && !hasRead) &&
									< button
										className={markBookAsReadMutation.isPending ? 'btn btn--spinner' : 'btn'}
										disabled={markBookAsReadMutation.isPending}
										onClick={() => markBookAsReadMutation.mutate()}
									>
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
								{bookReviewsData.length > 0
									?
									<ListReviews
										bookReviews={bookReviewsData}
									/>
									: <p>No reviews yet{UserCTX.user ? ' be the first!' : '!'}</p>
								}

							</div>
							{(!hasReviewed && UserCTX.user)
								&& <div className="section__comment-form">
									<div className="section__comment-form-head">
										<h6>Write a review</h6>
									</div>

									<div className="section__comment-form-body">
										<FormReview
											bookId={bookId}
											book={bookData}
										/>
									</div>
								</div>
							}
						</div>
					</div>
				</div>
			</section >
		</>
	)
}