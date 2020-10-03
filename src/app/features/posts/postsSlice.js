import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchAllPosts, fetchSinglePost, fetchUserPosts, createPost as createNewPost } from '../../api/ApiUtils';

// adpter
const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt)
});

const initialState = postsAdapter.getInitialState({
    total: 0,
    status: 'idle', //idle, loading, succeded, failed
    error: null
});

export const retrivePosts = createAsyncThunk('posts/retrivePosts', async ({ page, limit, sort }) => {
    const response = await fetchAllPosts({ page, limit, sort });
    const data = response.data.data;
    const temp = [];
    data.posts.map(p => {
        temp.push({
            ...p,
            id: p._id
        })
    });
    return { posts: temp, total: data.totalRecords };
});

export const retriveUserPosts = createAsyncThunk('posts/retriveUserPosts', async ({ page, limit, sort, userId }) => {
    const response = await fetchUserPosts({ page, limit, sort, userId });
    const data = response.data.data;
    const temp = [];
    data.posts.map(p => {
        temp.push({
            ...p,
            id: p._id
        })
    });
    return { posts: temp, total: data.totalRecords };
});

/* export const retrivePostById = createAsyncThunk('posts/retrivePostById', async postId => {
    const response = await fetchSinglePost(postId);
    const post = response.data.post;
    return {...post, id: post._id};
});*/

export const createPost = createAsyncThunk('posts/createPost', async postData => {
    const response = await createNewPost(postData);
    return response.data.data;
});

export const updatePost = createAsyncThunk('posts/updatePost', async postData => {
    const response = await updatePost(postData);
    return response.data.data;
});

export const deletePost = createAsyncThunk('posts/retrivePostById', async postId => {
    const response = await deletePost(postId);
    return response.data.data;
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
    },
    extraReducers: {
        [retrivePosts.pending]: (state, action) => {
            state.status = 'loading';
        },
        [retrivePosts.fulfilled]: (state, action) => {
            state.status = 'success';
            state.total = action.payload.total;
            postsAdapter.removeAll(state)
            postsAdapter.upsertMany(state, action.payload.posts);
        },
        [retrivePosts.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message
        },


        [retriveUserPosts.pending]: (state, action) => {
            state.status = 'loading';
        },
        [retriveUserPosts.fulfilled]: (state, action) => {
            state.status = 'success';
            state.total = action.payload.total;
            postsAdapter.removeAll(state)
            postsAdapter.upsertMany(state, action.payload.posts);
        },
        [retriveUserPosts.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message
        },

        /* 
                [retrivePostById.pending]: (state, action) => {
                    state.status = 'loading';
                },
                [retrivePostById.fulfilled]: (state, action) => {
                    state.status = 'success';
                    console.log({payload: action.payload});
                    postsAdapter.addOne(state, action.payload);
                },
                [retrivePostById.rejected]: (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message
                },
         */

        [createPost.pending]: (state, action) => {
            state.status = 'loading';
        },
        [createPost.fulfilled]: (state, action) => {
            state.status = 'success';
            postsAdapter.addOne(state, action.payload);
        },
        [createPost.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message
        },


        [updatePost.pending]: (state, action) => {
            state.status = 'loading';
        },
        [updatePost.fulfilled]: (state, action) => {
            state.status = 'success';
            postsAdapter.updateOne(state, action.payload);
        },
        [updatePost.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message
        },


        [deletePost.pending]: (state, action) => {
            state.status = 'loading';
        },
        [deletePost.fulfilled]: (state, action) => {
            state.status = 'success';
            postsAdapter.removeOne(state, action.payload);
        },
        [deletePost.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message
        }
    }
});

// reducers actions
export const { } = postsSlice.actions;

// postAdapter - custimized selectors
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostsIds,
    selectTotal: selectPostsCount
} = postsAdapter.getSelectors(state => state.posts);


// // Memoized selector using Reselect
export const selectUserPosts = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => {
        console.log({post9999:post});
        return post.creator._id.toString() === userId.toString()
    })
)

export default postsSlice.reducer;