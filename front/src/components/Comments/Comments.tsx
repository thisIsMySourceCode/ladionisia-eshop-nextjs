import { useSelector } from "react-redux"
import { useAppDispatch } from "../../app/store"
import { createComment, disableCommentUser, getAllComments, getAllUsersDb, reportCommentUser, selectAllComments, selectAllCommentsStatus, selectAllUsers } from "../../features/comments/commentsSlice"
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { EStateGeneric } from "../../utils/general";
import EditComment from "./EditComment";
import { useUser } from "@auth0/nextjs-auth0/client";
import { registerUser } from "../../features/comments/commentsApi";
import s from "./Comments.module.css"
import GenericModal from "../Modals/GenericModal";
const Comments = () => {
    const { user } = useUser();
    const router = useRouter()
    const dispatch = useAppDispatch()
    const comments = useSelector(selectAllComments)
    const users = useSelector(selectAllUsers)
    const userExistente = users.find(u => u.email === user?.email)
    const [modalConfirmDeleteComment, setModalConfirmDeleteComment] = useState(false)
    const [comment, setComment] = useState({
        content: "",
        rating: 0,
        userId: 0,
    })
    const allCommentsStatus = useSelector(selectAllCommentsStatus)
    const { id } = router.query
    useEffect(() => {
        const fetchData = async () => {
            if (router.isReady) {
                if (allCommentsStatus === EStateGeneric.IDLE) {
                    await dispatch(getAllComments(id?.toString()));
                    await dispatch(getAllUsersDb());
                }
            }
        }
        fetchData()
    }, [id])
    async function handleNewComment(e) {
        e.preventDefault();
        if (user) {
            try {
                await registerUser(user)
            } catch (error) {
                console.log(error.message);
            }
            if (!comment.content || !comment.rating) return alert('something went wrong')
            await dispatch(createComment({ id, comment }));
            alert('Comment Created')
            setComment({
                content: "",
                rating: 0,
                userId: 0,
            })
            dispatch(getAllComments(id?.toString()));

        }

    }
    function deleteComment(comment) {
        dispatch(disableCommentUser(comment?.toString()));
        alert('Comment Deleted')
        dispatch(getAllComments(id?.toString()));
    }
    function reportComment(e) {
        const { value } = e.target
        dispatch(reportCommentUser(value?.toString()));
        dispatch(disableCommentUser(value?.toString()));
        alert('Comment Reported')
        dispatch(getAllComments(id?.toString()));
    }
    function handleChange(e) {
        setComment({
            ...comment,
            [e.target.name]: e.target.value,
            userId: userExistente?.id
        })
        if (e.target.name === 'rating') {
            const r = parseInt(e.target.value)
            setComment({
                ...comment,
                rating: r,
                userId: userExistente?.id
            })
        }
    }
    function ratingToWineEmoji(rating) {
        let wineEmoji = "";
        for (let i = 0; i < rating; i++) {
            wineEmoji += "🍷";
        }
        return wineEmoji;
    }
    return (
        <div className="p-4">
            <table className="w-full">
                <tr>
                    <td className="p-4">
                        {comments?.map((comment) => (
                            <div className="mb-2 p-4">
                                <div className="flex justify-between">
                                    <p>
                                        <span className="font-bold">{comment.user?.name} </span>({comment.createdAt})
                                    </p>
                                    <span className={s.copas}>{ratingToWineEmoji(comment.rating)}</span>
                                </div>
                                <p>{comment.content}</p>
                                <div className="flex p-2">
                                    {
                                        userExistente && (
                                            <div className="flex justify-between">
                                                <details className="flex flex-col ml-2">
                                                    <summary className={`${s.iconos} p-2`}>
                                                        🖊️ Edit
                                                    </summary>
                                                    <EditComment comment={comment} />
                                                </details>
                                                <button className={`${s.iconos} p-2`} onClick={() => setModalConfirmDeleteComment(true)}>🗑️ Delete</button>
                                                <GenericModal
                                                    display={modalConfirmDeleteComment}
                                                    setDisplay={setModalConfirmDeleteComment}
                                                    title='Delete Comment'
                                                    onClickAccept={() => deleteComment(comment.id)}
                                                    acceptBtnLabel="Yes"
                                                    message={`Are you sure you want to delete your comment?`}
                                                />
                                            </div>
                                        )
                                    }{
                                        !userExistente && <button className={`${s.iconoReport} p-2`} value={comment.id} onClick={(e) => reportComment(e)}>⚠️ Report</button>
                                    }

                                </div>
                            </div>

                        ))}
                        {
                            user && <form className="flex flex-col w-full items-end p-4" onSubmit={(e) => handleNewComment(e)}>
                                <textarea className={`${s.textarea} w-full h-28`} wrap="hard" placeholder="ADD YOUR RATING & REVIEW" value={comment.content} name="content" onChange={(e) => handleChange(e)}></textarea>
                                <div className="mt-4">
                                    <div className={s.rating}>
                                        <button type="submit" className={s.btn}>Add a review</button>
                                        <input value="5" type="radio" name="rating" id="rating-🍷5" onChange={(e) => handleChange(e)} />
                                        <label htmlFor="rating-🍷5"></label>
                                        <input value="4" type="radio" name="rating" id="rating-🍷4" onChange={(e) => handleChange(e)} />
                                        <label htmlFor="rating-🍷4"></label>
                                        <input value="3" type="radio" name="rating" id="rating-🍷3" onChange={(e) => handleChange(e)} />
                                        <label htmlFor="rating-🍷3"></label>
                                        <input value="2" type="radio" name="rating" id="rating-🍷2" onChange={(e) => handleChange(e)} />
                                        <label htmlFor="rating-🍷2"></label>
                                        <input value="1" type="radio" name="rating" id="rating-🍷1" onChange={(e) => handleChange(e)} />
                                        <label htmlFor="rating-🍷1"></label>
                                    </div>
                                </div>
                            </form>
                        }
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default Comments