import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { useDispatch } from "react-redux";
import { authReducer } from "./auth/auth.slice";
import { postsReducer } from "./auth/post.slice";
//=========================================================================================================================

const makeStore = () =>
	configureStore({
		reducer: {
			posts: postsReducer,
			auth: authReducer
		},
		devTools: true,
	});


export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

const AppDispatch = makeStore().dispatch;
type AppDispatch = typeof AppDispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const wrapper = createWrapper<AppStore>(makeStore);


