import s from "./Comments.module.css"
const Rating = ({handleChange, input}) => {
    return (
        <div className="mt-4">
            <div className={s.rating}>
                <button type="submit" className={s.btn}>Update</button>
                <input value="5" type="radio" name="rating" id={`rating-🍷-${input.id}5`} onChange={(e) => handleChange(e)} checked={input?.rating === 5} />
                <label htmlFor={`rating-🍷-${input.id}5`} ></label>
                <input value="4" type="radio" name="rating" id={`rating-🍷-${input.id}4`} onChange={(e) => handleChange(e)} checked={input?.rating === 4} />
                <label htmlFor={`rating-🍷-${input.id}4`} ></label>
                <input value="3" type="radio" name="rating" id={`rating-🍷-${input.id}3`} onChange={(e) => handleChange(e)} checked={input?.rating === 3} />
                <label htmlFor={`rating-🍷-${input.id}3`} ></label>
                <input value="2" type="radio" name="rating" id={`rating-🍷-${input.id}2`} onChange={(e) => handleChange(e)} checked={input?.rating === 2} />
                <label htmlFor={`rating-🍷-${input.id}2`} ></label>
                <input value="1" type="radio" name="rating" id={`rating-🍷-${input.id}1`} onChange={(e) => handleChange(e)} checked={input?.rating === 1} />
                <label htmlFor={`rating-🍷-${input.id}1`} ></label>
            </div>
        </div>
    )
}

export default Rating