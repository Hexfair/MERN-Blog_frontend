import { createSlice } from '@reduxjs/toolkit';
// import { AppState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';
import { PostItem } from '../../interfaces/post.interface'
//=========================================================================================================================

export interface PostState {
	posts: PostItem[];
	status: string;
}

const initialState: PostState = {
	posts: [],
	status: 'loading'
};

export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		setPosts(state, action) {
			state.posts = action.payload;
			state.status = 'success';
		},
	},

	extraReducers: {
		[HYDRATE]: (state, action) => {
			return {
				...state,
				...action.payload.posts,
			};
		},
	},
});

export const { setPosts } = postsSlice.actions;

//export const selectAuthState = (state: AppState) => state.auth.authState;

export const postsReducer = postsSlice.reducer;