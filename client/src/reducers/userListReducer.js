import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const userListSlice = createSlice({
  name: "userList",
  initialState: [],
  reducers: {
    setUserList(state, action) {
      return action.payload;
    },
    appendUser(state, action) {
      state.push(action.payload);
    },
  },
});

export const initializeUserList = () => {
  return async (dispatch) => {
    const userList = await userService.getUsers();
    dispatch(setUserList(userList));
  };
};

export const { appendUser, setUserList } = userListSlice.actions;
export default userListSlice.reducer;
