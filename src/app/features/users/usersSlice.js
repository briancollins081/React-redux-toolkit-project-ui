import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchAllUsers, fetchSingleUser } from '../../api/ApiUtils';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
    total: 0,
    status: 'idle', //idle, loading, succeded, failed
    error: null
});

export const retriveUsers = createAsyncThunk('users/retriveUsers', async ({ page, limit, sort }) => {
    const response = await fetchAllUsers({ page, limit, sort });
    const data = response.data;
    // console.log({data});
    const temp = [];
    data.users.map(p => {
        temp.push({
            ...p,
            id: p._id
        });
    });
    return {users: temp, total: data.totalRecords };
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    },
    extraReducers: {
        [retriveUsers.pending]: (state, action) => {
            state.status = 'loading';
        },
        [retriveUsers.fulfilled]: (state, action) => {
            state.status = 'success';
            state.total = action.payload.total;
            usersAdapter.removeAll(state);
            usersAdapter.upsertMany(state, action.payload.users);
        },
        [retriveUsers.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message
        },
    }
});


// reducers actions
export const { } = usersSlice.actions;

// userAdapter - custimized selectors
export const {
    selectAll: selectAllUsers,
    selectById
} = usersAdapter.getSelectors(state => state.users);


// Memoized selectors using Reselect
// export const selectAllUsers = createSelector(
//     [selectAll],
//     (users) => users.slice()
// )

export default usersSlice.reducer;