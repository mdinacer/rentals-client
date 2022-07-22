import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import { User } from "../models/user";
import { history } from "../..";
import agent from "../api/agent";


interface AccountState {
    user: User | null,

}

const initialState: AccountState = {
    user: null,

}

export const signInUser = createAsyncThunk<User, FieldValues>(
    "account/signInUser",
    async (data, thunkApi) => {
        try {
            const user = await agent.Account.login(data);
            localStorage.setItem("user", JSON.stringify(user))
            return user;
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data })
        }
    }
)

export const fetchCurrentUser = createAsyncThunk<User>(
    "account/fetchCurrentUser",
    async (_, thunkApi) => {
        thunkApi.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
        try {
            const user = await agent.Account.currentUser();
            localStorage.setItem("user", JSON.stringify(user))
            return user;
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data });
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem('user')) return false;
        }
    }
)

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null;
            localStorage.removeItem("user");
            history.push('/');
        },
        setUser: (state, action) => {
            const data = action.payload.token.split('.')[1];
            if (data) {
                let claims = JSON.parse(atob(data));
                let roles = claims["roles"];
                state.user = { ...action.payload, roles };
            } else {
                state.user = action.payload;
            }
        },
        setProfile: (state, action) => {
            if (state.user) {
                state.user.profile = action.payload
            }
        },
    },
    extraReducers: (builder => {
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem('user');
            history.push('/account/login');
        });

        builder.addCase(signInUser.rejected, (state, action) => {
            throw action.payload;
        })

        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
            const data = action.payload.token.split('.')[1];

            if (data) {
                let claims = JSON.parse(atob(data));
                let roles = claims["roles"];
                state.user = { ...action.payload, roles };

            } else {
                state.user = action.payload;
            }

        });

    })
})

export const { setUser, setProfile, signOut } = accountSlice.actions;

