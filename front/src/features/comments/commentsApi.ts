import axios from "axios";



export const registerUser = (user) => axios.post(`${process.env.RESTURL_PRODUCTS}/users/register`, user)
export const getAllUsersDbApi = () => axios(`${process.env.RESTURL_PRODUCTS}/users`)
export const getAllUsersAuth0Api = () => axios(`${process.env.RESTURL_PRODUCTS}/auth0/users`)
// Comments
export const createCommentProduct = (id: string| string[], comment) => axios.post(
    `${process.env.RESTURL_PRODUCTS}/comments/${id}`,
    comment,
    // { headers: { 'Content-Type': 'multipart/form-data' } }/comments/report/
  )
  export const updateComment = (comment) => axios.patch(`${process.env.RESTURL_PRODUCTS}/comments/${comment.id}`, comment)
  export const disableComment = (id: string) => axios.patch(`${process.env.RESTURL_PRODUCTS}/comments/disable/${id}`)
  export const enableComment = (id: string) => axios.patch(`${process.env.RESTURL_PRODUCTS}/comments/enable/${id}`)
  export const updateRatingComment = (id: string) => axios.patch(`${process.env.RESTURL_PRODUCTS}/comments/rating/${id}`)
  export const getAllCommentsProduct = (id: string) => axios(`${process.env.RESTURL_PRODUCTS}/comments?productId=${id}`)
  export const getOneCommentProduct = (id: string) => axios(`${process.env.RESTURL_PRODUCTS}/comments/comment/${id}`)
  export const getAllCommentsDisabled = () => axios(`${process.env.RESTURL_PRODUCTS}/comments/disabled`)
  export const getAllCommentsReports = () => axios(`${process.env.RESTURL_PRODUCTS}/comments/reported`)
  export const reportComment = (id: string) => axios.patch(`${process.env.RESTURL_PRODUCTS}/comments/report/${id}`)
  export const deleteComment = (id: string) => axios.delete(`${process.env.RESTURL_PRODUCTS}/comments/destroy/${id}`)