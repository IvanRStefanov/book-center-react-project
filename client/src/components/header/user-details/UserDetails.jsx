import { Link } from "react-router-dom";

import styles from './UserDetails.module.scss'

export default function UserDetails({
	loggedInUser,
	userPostedBooks,
	userReviewedBooks,
	userReadBooks,
	onClose,
	onLogout
}) {

	// console.log(userPostedBooks.length)
	// console.log(userReviewedBooks.length)
	// console.log(userReadBooks.length)
	return (
		<div className={styles['modal-user-details']}>
			<div className={styles.modal__bg} onClick={onClose}></div>

			<div className={styles.modal__content}>
				<div className={styles['modal__content-inner']}>
					<button className={styles['modal__close-btn']} onClick={onClose}></button>

					<div className={styles['modal__user-img']}>
						<img src={loggedInUser.imageUrl} alt="Your photo" />
					</div>

					<div className={styles['modal__user-body']}>
						<ul>
							<li>
								<span>Name:</span> {loggedInUser.firstName} {loggedInUser.lastName}
							</li>

							<li>
								<span>Email:</span> {loggedInUser.email}
							</li>
							<li>
								<span>Books Added:</span> {userPostedBooks.length}
							</li>

							<li>
								<span>Books Reviewed:</span> {userReviewedBooks.length}
							</li>

							<li>
								<span>Books Read:</span> {userReadBooks.length}
							</li>
						</ul>
					</div>

					<div className={styles['modal__user-actions']}>
						<Link className={styles['modal__btn']} to="/" onClick={onLogout}>Logout</Link>
						<Link className={styles['modal__btn']} to="/my-account" onClick={onClose}>Account details</Link>
					</div>
				</div>
			</div>
		</div>
	);
}