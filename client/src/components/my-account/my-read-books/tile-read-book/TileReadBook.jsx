import { Link } from "react-router-dom";

export default function TileReadBook({
    readBook
}) {
    return (
        <Link className="tile-read-book" to={`/catalog/${readBook.bookId}`}>
            <img src={readBook.bookImgUrl} alt="no image" />
        </Link>
    );
}