import { useEffect, useState } from "react";
import { baseUrl } from "../../../../utils/variables";
import { Navigate } from "react-router-dom";
import TileBook from "../../../tile-book/TileBook";

export default function MyPublishedBooks({
    loggedInUser
}) {

    if (!loggedInUser) {
        return <Navigate to="/" />
    }

    const [publishedBooks, setPublishedBooks] = useState([]);
    useEffect(() => {
        async function getPublishedBooks() {
            try {
                const ownerId = loggedInUser._id;
                const response = await fetch(`${baseUrl}/books?where=_ownerId%3D%22${ownerId}%22`);
                const data = await response.json();

                if (response.ok != true) {
                    const error = await response.json();
                    throw new Error(error.message);
                }

                setPublishedBooks(data);
            } catch (error) {
                console.log('published books err', error.message)
            }
        }

        getPublishedBooks()
    }, [])

    return (
        <>
            <ul className="list-published-books">
                {publishedBooks.map(book => 
                    <li key={book._id}>
                        <TileBook book={book} />
                    </li>
                )}
            </ul>
        </>
    );
}