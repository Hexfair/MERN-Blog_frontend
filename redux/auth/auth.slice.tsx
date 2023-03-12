import { FormLoginData } from '@/interfaces/login.interface';
import { FormRegisterData } from '@/interfaces/register.interface';
import { UserItem } from '@/interfaces/user.interface';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
//=========================================================================================================================


//=========================================================================================================================

export const fetchLoginData = createAsyncThunk('auth/fetchLoginData', async (params: FormLoginData) => {
	const { data } = await axios.post<UserItem>('http://localhost:4444/auth/login', params);
	if (data.token) {
		localStorage.setItem('token', data.token);
	}
	return data;
});

export const fetchRegisterData = createAsyncThunk('auth/fetchRegisterData', async (params: FormRegisterData) => {
	const { data } = await axios.post<UserItem>('http://localhost:4444/auth/register', params);
	if (data.token) {
		localStorage.setItem('token', data.token);
	}
	return data;
});

export const fetchGetMe = createAsyncThunk('auth/fetchGetMe', async () => {
	const localToken = window.localStorage.getItem('token') || '';

	const { data } = await axios.get('http://localhost:4444/auth/me', {
		headers: {
			Authorization: localToken
		}
	});
	return data as UserItem;
});

interface AuthState {
	dataUser: null | UserItem,
	status: string
}

const initialState: AuthState = {
	dataUser: null,
	status: 'loading'
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.dataUser = null;
		}
	},
	extraReducers: (builder) => {
		builder
			// Login
			.addCase(fetchLoginData.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(fetchLoginData.fulfilled, (state, action) => {
				state.status = 'success';
				state.dataUser = action.payload;
			})
			.addCase(fetchLoginData.rejected, (state) => {
				state.status = 'rejected';
			})

			// Register
			.addCase(fetchRegisterData.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(fetchRegisterData.fulfilled, (state, action) => {
				state.status = 'success';
				state.dataUser = action.payload;
			})
			.addCase(fetchRegisterData.rejected, (state) => {
				state.status = 'rejected';
			})

			// GetMe
			.addCase(fetchGetMe.fulfilled, (state, action) => {
				state.status = 'success';
				state.dataUser = action.payload;
			})
			.addCase(fetchGetMe.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(fetchGetMe.rejected, (state) => {
				state.status = 'rejected';
			});
	}
});

export const { logout } = authSlice.actions;

//export const selectAuthState = (state: AppState) => state.auth.authState;

export const authReducer = authSlice.reducer;