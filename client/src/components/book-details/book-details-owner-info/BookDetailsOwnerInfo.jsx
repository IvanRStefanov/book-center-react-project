import { Link } from "react-router-dom";

export default function BookDetailsOwnerInfo({
    book
}) {
    return (
        <div className="section__main-publisher-info">
            <h6>Publisher details</h6>

            <ul>
                <li>
                    <span>
                        <svg fill="none" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </span>
                    {book.publisherFirstName} {book.publisherLastName}
                </li>

                <li>
                    <span>
                        <svg viewBox="0 0 512 512" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                            <path d="M256 352c-16.53 0-33.06-5.422-47.16-16.41L0 173.2V400c0 26.5 21.49 48 48 48h416c26.51 0 48-21.49 48-48V173.2L303.2 335.7C289.1 346.6 272.5 352 256 352zM16.29 145.3l212.2 165.1c16.19 12.6 38.87 12.6 55.06 0l212.2-165.1C505.1 137.3 512 125 512 112c0-26.51-21.5-48-48-48H48C21.49 64 0 85.49 0 112c0 13 6.01 25.3 16.29 33.3z" />
                        </svg>
                    </span>
                    <Link to={`mailto:${book.publisherEmail}`}>{book.publisherEmail}</Link>
                </li>
            </ul>
        </div>
    );
}