import { useContext, useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";


import { UserContext } from "../../contexts/UserContext";
import { getSingleBook, updateBook } from "../../services/booksService";
import { useMutation, useQuery } from "@tanstack/react-query";
import BookEditForm from "./book-edit-form/BookEditForm";

export default function BookEdit() {
  const { bookId } = useParams();
  // const UserCTX = useContext(UserContext);
  // const navigate = useNavigate();

  const {
    isLoading: isLoadingBookData,
    error: bookDataError,
    data: bookData,
  } = useQuery({
    queryKey: ['singleBookEdit'],
    queryFn: async () => {
      const bookObject = await getSingleBook(bookId);
      if (bookObject.code === 404) {
        console.error(bookDataError.message)
        return Promise.reject('Resource not found!')
      }
      return bookObject;
    },
    // refetchOnWindowFocus: "always"
  });

  if (isLoadingBookData) {
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

  return (
    <section className="section-edit-book">
      <div className="shell section__shell">
        <div className="section__form">
          <BookEditForm book={bookData} />
        </div>
      </div>
    </section>
  );
}