import { useContext } from 'react';
import { Link } from "react-router-dom";

import UserContext from '../../../contexts/UserContext';

import styles from './UserDetails.module.scss'

export default function UserDetails({
	onClose,
	onLogout
}) {
	const UserCTX = useContext(UserContext);

	return (
		<div className={styles['modal-user-details']}>
			<div className={styles.modal__bg} onClick={onClose}></div>

			<div className={styles.modal__content}>
				<div className={styles['modal__content-inner']}>
					<button className={styles['modal__close-btn']} onClick={onClose}></button>

					<div className={styles['modal__user-img']}>
						{/* <img src={loggedInUser.imageUrl} alt="Your photo" /> */}
						<img src={UserCTX.user.imageUrl} alt="Your photo" />
					</div>

					<div className={styles['modal__user-body']}>
						<ul>
							<li>
								{/* <span>Name:</span> {loggedInUser.firstName} {loggedInUser.lastName} */}
								<span>Name:</span> {UserCTX.user.firstName} {UserCTX.user.lastName}
							</li>

							<li>
								{/* <span>Email:</span> {loggedInUser.email} */}
								<span>Email:</span> {UserCTX.user.email}
							</li>
							<li>
								{/* <span>Books Added:</span> {userPostedBooks.length} */}
								<span>Books Added:</span> {UserCTX.postedBooks.length}
							</li>

							<li>
								{/* <span>Books Reviewed:</span> {userReviewedBooks.length} */}
								<span>Books Reviewed:</span> {UserCTX.reviewedBooks.length}
							</li>

							<li>
								{/* <span>Books Read:</span> {userReadBooks.length} */}
								<span>Books Read:</span> {UserCTX.readBooks.length}
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