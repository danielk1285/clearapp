import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '@store/index';

export interface UserState {
  userid?: string;
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  userImage?: string;
  authParty?: string;
  refreshToken?: string;
  kycVerified?: string;
}

const initialState: UserState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userid = action.payload.userid;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.userImage = action.payload.userImage;
      state.authParty = action.payload.authParty;
      state.refreshToken = action.payload.refreshToken;
      state.kycVerified = action.payload.kycVerified;
    },
    logout: state => {
      state.userid = undefined;
      state.email = undefined;
      state.username = undefined;
      state.firstName = undefined;
      state.lastName = undefined;
      state.userImage = undefined;
      state.authParty = undefined;
      state.refreshToken = undefined;
      state.kycVerified = undefined;
    },
  },
});

export const {login, logout} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

const userReducer = userSlice.reducer;

export default userReducer;
