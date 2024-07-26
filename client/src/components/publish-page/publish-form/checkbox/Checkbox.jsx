export default function Checkbox({
    genre,
    isDisabled,
    changeHandler
}) {
    return (
        <li>
            <input type="checkbox" id={genre} name={genre} value={genre} disabled={isDisabled} onChange={changeHandler} />
            <label htmlFor={genre}>{genre}</label>
        </li>
    );
}