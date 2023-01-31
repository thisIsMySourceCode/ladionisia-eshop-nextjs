import { useSelector } from "react-redux"
import Sidebar from "../../../components/Dashboard/Sidebar"
import NavBar from "../../../components/Navbar/NavBar"
import { getAllCommentsDisables, selectAllCommentsDisabled, selectAllCommentsDisabledStatus } from "../../../features/comments/commentsSlice"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { EStateGeneric } from "../../../utils/general"
import { useAppDispatch } from "../../../app/store"
import { deleteComment, enableComment } from "../../../features/comments/commentsApi"
import s from "./Comments.module.css"
import GenericModal from "../../../components/Modals/GenericModal"
import Footer from "../../../components/Footer/Footer"
const Users = () => {
    const commentsDisabledStatus = useSelector(selectAllCommentsDisabledStatus)
    const commets = useSelector(selectAllCommentsDisabled)
    const router = useRouter()
    const [modalDeleteComment, setModalDeleteComment] = useState(false)
    const [modalEnableComment, setModalEnableComment] = useState(false)
    const dispatch = useAppDispatch()
    useEffect(() => {
        const fetchData = async () => {
            if (router.isReady) {
                if (commentsDisabledStatus === EStateGeneric.IDLE) {
                    await dispatch(getAllCommentsDisables());
                }
            }
        }
        fetchData()
    }, [])
    async function deleteCommentAdm(value) {
        const res = await deleteComment(value)
        console.log(res)
        await dispatch(getAllCommentsDisables());
        alert('Comment Deleted')
    }
    async function enableCommentAdm(value) {
        const resp = await enableComment(value)
        console.log(resp);
        await dispatch(getAllCommentsDisables());
        alert('Comment enable')
    }
    function ratingToWineEmoji(rating) {
        let wineEmoji = "";
        for (let i = 0; i < rating; i++) {
            wineEmoji += "🍷";
        }
        return wineEmoji;
    }
    return (
        <><title>La Dionisia - Dashboard</title>
            <NavBar></NavBar>
            <div className="
            main-body
            home
            mb-8
            m-auto
            max-w-screen-xl
            pb-24
            sm:rounded-2xl
            ">
                <NavBar />
                <div className="w-full flex">
                    <Sidebar />
                    <div className="w-full flex flex-col">
                        <h2 className="font-bold text-3xl text-center">Reported Comments</h2>
                        <table className="w-full">
                            <tr>
                                <td className="p-4">
                                    {commets.map(c => (
                                        <div className="mb-2 p-4">
                                            <div className="flex justify-between">
                                                <p className="font-bold">
                                                    Wine: <a href={`/products/${c.product.id}`} className="font-bold underline decoration-red-900/70">{c.product.wine}</a>
                                                </p>
                                                <span className={s.copas}>{ratingToWineEmoji(c.rating)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <p>
                                                    <span className="font-bold">User: {c.user?.name} </span>- ({c.createdAt})
                                                </p>
                                            </div>
                                            <p>{c.content}</p>
                                            <div className="flex p-2">
                                                <button className={`${s.iconos} p-2`} value={c.id} onClick={() => setModalEnableComment(true)}>✔ Enable</button>
                                                <button className={`${s.iconos} p-2`} value={c.id} onClick={() => setModalDeleteComment(true)}>🗑️ Delete</button>
                                            </div>
                                            <GenericModal
                                                display={modalDeleteComment}
                                                setDisplay={setModalDeleteComment}
                                                title='Delete Comment'
                                                onClickAccept={() => deleteCommentAdm(c.id)}
                                                acceptBtnLabel="Yes"
                                                message={`Are you sure you want to delete ${c.user?.name}'s comment?`}
                                            />
                                            <GenericModal
                                                display={modalEnableComment}
                                                setDisplay={setModalEnableComment}
                                                title='Enable Comment'
                                                onClickAccept={() => enableCommentAdm(c.id)}
                                                acceptBtnLabel="Yes"
                                                message={`Are you sure you want to enable ${c.user?.name}'s comment?`}
                                            />
                                        </div>
                                    ))}
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Users