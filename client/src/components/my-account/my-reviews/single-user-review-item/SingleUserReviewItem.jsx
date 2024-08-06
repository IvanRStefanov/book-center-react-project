import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { deleteUserReview } from "../../../../services/reviewBookSService";
import { UserContext } from "../../../../contexts/UserContext";
import { formatDate } from "../../../../utils/utils";

export default function SIngleUserReviewItem({
    review,
}) {
    const queryClient = useQueryClient()
    const [isDeleting, setIsDeleting] = useState(false)
    console.log(review)

    async function displayWarning() {
        setIsDeleting(oldState => !oldState);
    }

    async function hideWarning() {
        setIsDeleting(oldState => !oldState);
    }

    async function handleDeleteReview() {
        await deleteUserReview(review._id);
        queryClient.invalidateQueries({queryKey: ['userReviewedBooks']})
        hideWarning();
    }

    return (
        <li className="list__item">
            {isDeleting &&
                <div className="list__item-warning">
                    <p>Are you sure you want to delete this review?</p>

                    <div className="list__item-warning-actions">
                        <button
                            className="list__item-btn"
                            onClick={handleDeleteReview}
                        >
                            Yes
                        </button>

                        <button
                            className="list__item-btn list__item-btn--reject"
                            onClick={hideWarning}
                        >
                            No
                        </button>
                    </div>
                </div>
            }

            <div className="list__item-content">
                <p className="list__item-head">
                    Reviewed book:&nbsp;&nbsp;&nbsp;
                    <Link to={`/catalog/${review.bookId}`}>
                        {review.bookName}
                    </Link>
                </p>

                <p className="list__item-body">
                    Review:&nbsp;&nbsp;&nbsp;{review.comment}
                    <br />
                    Reviewed at: {formatDate(review._createdOn)}
                </p>
            </div>

            <button className="list__item-delete-btn" onClick={displayWarning}>
                <img src="../../src/assets/images/delete-icon.png" alt="" />
            </button>
        </li>
    );
}