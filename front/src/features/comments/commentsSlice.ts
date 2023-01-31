import { getAllCommentsProduct, createCommentProduct, disableComment, updateComment, getOneCommentProduct, reportComment, getAllUsersDbApi, getAllCommentsDisabled, getAllUsersAuth0Api } from "./commentsApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EStateGeneric } from "../../utils/general";
interface Comment {
    content: string,
    rating: number,
    userId: number,
}
export const getAllComments = createAsyncThunk(
    'comments/getAllWines',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await getAllCommentsProduct(id)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const getAllCommentsDisables = createAsyncThunk(
    'comments/getAllCommentsDisables',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllCommentsDisabled()
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const getAllUsersDb = createAsyncThunk(
    'comments/getAllUsersDb',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllUsersDbApi()
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const getAllUsersAuth0 = createAsyncThunk(
    'comments/getAllUsersAuth0',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllUsersAuth0Api()
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const createComment = createAsyncThunk(
    'comments/createComment',
    async ({ id, comment }: { id: string | string[], comment: Comment }, { rejectWithValue }) => {
        try {
            const response = await createCommentProduct(id, comment)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const disableCommentUser = createAsyncThunk(
    'comments/disableCommentUser',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await disableComment(id)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const reportCommentUser = createAsyncThunk(
    'comments/reportCommentUser',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await reportComment(id)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const updateCommentUser = createAsyncThunk(
    'comments/updateCommentUser',
    async (comment: Comment, { rejectWithValue }) => {
        try {
            const response = await updateComment(comment)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getOneComment = createAsyncThunk(
    'comments/getOneComment',
    async (id: string, { rejectWithValue }) => {
      try {
        const response = await getOneCommentProduct(id)
        return response.data
      } catch (error) {
        return rejectWithValue(error.response.data)
      }
    }
  )

const initialState = {
    comments: [],
    commentsDisabled: [],
    users: [],
    usersAuth0: [],
    allCommentsStatus: EStateGeneric.IDLE,
    allCommentsDisabledStatus: EStateGeneric.IDLE,
    allUsersStatus: EStateGeneric.IDLE,
    allUsersAuth0Status: EStateGeneric.IDLE,
}

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllComments.fulfilled, (state, action) => {
            state.comments = action.payload;
            state.allCommentsStatus = EStateGeneric.SUCCEEDED;
        })
        builder.addCase(getAllComments.pending, (state, _action) => {
            state.allCommentsStatus = EStateGeneric.PENDING;
        })
        builder.addCase(getAllComments.rejected, (state, _action) => {
            state.allCommentsStatus = EStateGeneric.FAILED;
        })

        
        builder.addCase(getAllCommentsDisables.fulfilled, (state, action) => {
            state.commentsDisabled = action.payload;
            state.allCommentsDisabledStatus = EStateGeneric.SUCCEEDED;
        })
        builder.addCase(getAllCommentsDisables.pending, (state, _action) => {
            state.allCommentsDisabledStatus = EStateGeneric.PENDING;
        })
        builder.addCase(getAllCommentsDisables.rejected, (state, _action) => {
            state.allCommentsDisabledStatus = EStateGeneric.FAILED;
        })


        builder.addCase(getAllUsersDb.fulfilled, (state, action) => {
            state.users = action.payload;
            state.allUsersStatus = EStateGeneric.SUCCEEDED;
        })
        builder.addCase(getAllUsersDb.pending, (state, _action) => {
            state.allUsersStatus = EStateGeneric.PENDING;
        })
        builder.addCase(getAllUsersDb.rejected, (state, _action) => {
            state.allUsersStatus = EStateGeneric.FAILED;
        })


        builder.addCase(getAllUsersAuth0.fulfilled, (state, action) => {
            state.usersAuth0 = action.payload;
            state.allUsersStatus = EStateGeneric.SUCCEEDED;
        })
        builder.addCase(getAllUsersAuth0.pending, (state, _action) => {
            state.allUsersStatus = EStateGeneric.PENDING;
        })
        builder.addCase(getAllUsersAuth0.rejected, (state, _action) => {
            state.allUsersStatus = EStateGeneric.FAILED;
        })



        builder.addCase(createComment.fulfilled, (state, action) => {
            state.comments = state.comments.concat(action.payload);
            state.allCommentsStatus = EStateGeneric.SUCCEEDED;
        })
        builder.addCase(createComment.pending, (state, _action) => {
            state.allCommentsStatus = EStateGeneric.PENDING;
        })
        builder.addCase(createComment.rejected, (state, _action) => {
            state.allCommentsStatus = EStateGeneric.FAILED;
        })



        builder.addCase(disableCommentUser.fulfilled, (state, action) => {
            state.comments = state.comments.map(comment => {
                if (comment.id === action.payload.id)
                    return { ...comment, ...action.payload }
                else return comment
            });
            state.allCommentsStatus = EStateGeneric.SUCCEEDED;
        })
        builder.addCase(disableCommentUser.pending, (state, _action) => {
            state.allCommentsStatus = EStateGeneric.PENDING;
        })
        builder.addCase(disableCommentUser.rejected, (state, _action) => {
            state.allCommentsStatus = EStateGeneric.FAILED;
        })



        builder.addCase(updateCommentUser.fulfilled, (state, action) => {
            state.comments = state.comments.map(comment => {
                if (comment.id === action.payload.id)
                    return { ...comment, ...action.payload }
                else return comment
            });
            state.allCommentsStatus = EStateGeneric.SUCCEEDED;
        })
        builder.addCase(updateCommentUser.pending, (state, _action) => {
            state.allCommentsStatus = EStateGeneric.PENDING;
        })
        builder.addCase(updateCommentUser.rejected, (state, _action) => {
            state.allCommentsStatus = EStateGeneric.FAILED;
        })
    

        builder.addCase(reportCommentUser.fulfilled, (state, action) => {
            state.allCommentsStatus = EStateGeneric.SUCCEEDED;
        })
        builder.addCase(reportCommentUser.pending, (state, _action) => {
            state.allCommentsStatus = EStateGeneric.PENDING;
        })
        builder.addCase(reportCommentUser.rejected, (state, _action) => {
            state.allCommentsStatus = EStateGeneric.FAILED;
        })
    }
})

export default commentsSlice.reducer

export const selectAllComments = (state) => state.comments.comments;
export const selectAllCommentsStatus = (state) => state.comments.allCommentsStatus;
export const selectAllCommentsDisabled = (state) => state.comments.commentsDisabled;
export const selectAllCommentsDisabledStatus = (state) => state.comments.allCommentsStatus;
export const selectAllUsers = (state) => state.comments.users;
export const AllUsersStatus = (state) => state.comments.allUsersStatus;
export const selectAllUsersAuth0 = (state) => state.comments.usersAuth0;
export const AllUsersStatusAuth0 = (state) => state.comments.allUsersAuth0Status;
