import { useRouter } from "next/router";
import { useAppDispatch } from "../../app/store"
import { getAllComments, updateCommentUser } from "../../features/comments/commentsSlice";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { EStateGeneric } from "../../utils/general";
import s from "./Comments.module.css"
import Rating from "./Rating";
const EditComment = ({ comment }) => {
    const router = useRouter()
    const [input, setInput] = useState({
        id: comment.id,
        content: comment.content,
        rating: comment.rating,
        productId: comment.productId,
        userId: comment.userId,
    })
    const { id } = router.query
    const dispatch = useAppDispatch()
    useEffect(() => {
        const fetchData = async () => {
            dispatch(getAllComments(id?.toString()));
        }
        fetchData()
    }, [input.id])
    function updateComment(e) {
        e.preventDefault()
        dispatch(updateCommentUser(input));
        dispatch(getAllComments(id?.toString()));
        alert('Comment Updated')
    }
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    return (
        <form className="w-96" onSubmit={(e) => updateComment(e)}>
            <textarea className={`${s.textarea} w-full h-28`} wrap="hard" placeholder="ADD YOUR RATING & REVIEW" name="content" onChange={(e) => handleChange(e)} value={input.content}></textarea>
            <Rating handleChange={handleChange} input={input}/>
        </form>
    )
}

export default EditComment