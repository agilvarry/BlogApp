import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer';
import blogReducer from './reducers/blogReducer';
import userListReducer from './reducers/userListReducer';
import notificationReducer from './reducers/notificationReducer';
const store = configureStore({
    reducer: {
        blogs: blogReducer,
        user: userReducer,
        userList: userListReducer,
        notification: notificationReducer
    }
});

export default store;
