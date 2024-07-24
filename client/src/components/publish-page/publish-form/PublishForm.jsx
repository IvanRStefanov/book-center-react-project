export default function PublishForm({
    changeHandler,
    publishNewBookSubmitHandler
}) {
    return (
        <div className="form">

            <form onSubmit={publishNewBookSubmitHandler}>
                <div className="form__head">
                    <h1>Publish new book</h1>
                </div>

                <div className="form__body">
                    <div className="form__row">
                        <label htmlFor="name" className="form__label">Book name</label>

                        <div className="form__controls">
                            <input type="text" className="field" name="name" id="name" onChange={changeHandler} />
                        </div>
                    </div>

                    <div className="form__row">
                        <label htmlFor="author" className="form__label">Author</label>

                        <div className="form__controls">
                            <input type="text" className="field" name="author" id="author" onChange={changeHandler} />
                        </div>
                    </div>

                    <div className="form__row">
                        <label htmlFor="imgUrl" className="form__label">Book cover URL</label>

                        <div className="form__controls">
                            <input type="text" className="field" name="imgUrl" id="imgUrl" onChange={changeHandler} />
                        </div>
                    </div>

                    <div className="form__row">
                        <label htmlFor="description" className="form__label">Book description</label>

                        <div className="form__controls">
                            <textarea className="textarea" name="description" id="description" onChange={changeHandler}></textarea>
                        </div>
                    </div>

                    <div className="form__row">
                        <fieldset>
                            <legend>What genre is the book?</legend>

                            <ul className="radios">
                                <li>
                                    <input type="radio" id="Fantasy" name="genre" value="Fantasy" onChange={changeHandler} />
                                    <label htmlFor="Fantasy">Fantasy</label>
                                </li>

                                <li>
                                    <input type="radio" id="Fiction" name="genre" value="Fiction" onChange={changeHandler} />
                                    <label htmlFor="Fiction">Fiction</label>
                                </li>

                                <li>
                                    <input type="radio" id="Adventure" name="genre" value="Adventure" onChange={changeHandler} />
                                    <label htmlFor="Adventure">Adventure</label>
                                </li>

                                <li>
                                    <input type="radio" id="Horror" name="genre" value="Horror" onChange={changeHandler} />
                                    <label htmlFor="Horror">Horror</label>
                                </li>

                                <li>
                                    <input type="radio" id="Sci-Fi" name="genre" value="Sci-Fi" onChange={changeHandler} />
                                    <label htmlFor="Sci-Fi">Sci-Fi</label>
                                </li>

                                <li>
                                    <input type="radio" id="Comedy" name="genre" value="Comedy" onChange={changeHandler} />
                                    <label htmlFor="Comedy">Comedy</label>
                                </li>

                                <li>
                                    <input type="radio" id="Thriller" name="genre" value="Thriller" onChange={changeHandler} />
                                    <label htmlFor="Thriller">Thriller</label>
                                </li>

                                <li>
                                    <input type="radio" id="History" name="genre" value="History" onChange={changeHandler} />
                                    <label htmlFor="History">History</label>
                                </li>

                                <li>
                                    <input type="radio" id="Teen" name="genre" value="Teen" onChange={changeHandler} />
                                    <label htmlFor="Teen">Teen</label>
                                </li>

                                <li>
                                    <input type="radio" id="Mistery" name="genre" value="Mistery" onChange={changeHandler} />
                                    <label htmlFor="Mistery">Mistery</label>
                                </li>
                            </ul>
                        </fieldset>
                    </div>

                    <div className="form__row">
                        <label htmlFor="price" className="form__label">Price</label>

                        <div className="form__controls">
                            <input type="number" className="field" name="price" id="price" step={.01} min={0} onChange={changeHandler} />
                        </div>
                    </div>
                </div>

                <div className="form__actions">
                    <input type="submit" className="form__btn" value="Submit" />
                </div>
            </form>
        </div>

    );
}