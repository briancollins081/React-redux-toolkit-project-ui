import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { loginUser } from '../../api/ApiUtils';

//Initialize the slice adapter
const authAdapter = createEntityAdapter();

const initialState = authAdapter.getInitialState({
    status: 'idle',
    error: null,
    message: ''
});

// Initialize the thunks to be used
export const signinUser = createAsyncThunk('auth/signin', async loginRequestBody => {
    const apiResponse = await loginUser(loginRequestBody);
    // console.log({auth: apiResponse.data});
    return apiResponse.data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signoutUser: (state, action) => {
            const { id } = action.payload;
            state = { ...initialState }
            authAdapter.removeOne(state, id);
        }
    },
    extraReducers: {
        [signinUser.pending]: (state, action) => {
            state.status = 'loading'
        },
        [signinUser.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.message = action.payload.message;
            // localStorage.setItem('token', action.payload.data.token);
            authAdapter.addOne(state, action.payload.data);
        },
        [signinUser.rejected]: (state, action) => {
            state.status = 'failed'
            state.message = action.error.message;
            state.error = action.error.message;
        }
    }
});

export default authSlice.reducer;

export const { signoutUser } = authSlice.actions;

export const { selectAll: selectAuthData } = authAdapter.getSelectors(state => state.auth);
