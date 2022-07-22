import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { Notification } from "../models/notification";
import { RootState } from "../store/configureStore";


interface notificationsState {
    status: string;
    notificationsLoaded: boolean;
}

const notificationsAdapter = createEntityAdapter<Notification>({
    selectId: (notification) => notification.id,
    //sortComparer: (a, b) => a.title.localeCompare(b.),
});

export const fetchNotificationsAsync = createAsyncThunk<Notification[], void, { state: RootState }>(
    "notification/fetchNotificationsAsync",
    async (_, thunkApi) => {
        try {
            const response = await agent.Notifications.list();
            return response.items;
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data });
        }
    }
)



export const notificationsSlice = createSlice({
    name: "notifications",
    initialState: notificationsAdapter.getInitialState<notificationsState>({
        notificationsLoaded: false,
        status: 'idle',

    }),
    reducers: {
        addNotification: notificationsAdapter.addOne,
        updateNotification: notificationsAdapter.updateOne,
        removeNotification: notificationsAdapter.removeOne,
    },
    extraReducers: (builder => {

        builder.addCase(fetchNotificationsAsync.pending, (state) => {
            state.status = "pendingFetchNotifications";
        });

        builder.addCase(fetchNotificationsAsync.fulfilled, (state, action) => {
            notificationsAdapter.setAll(state, action.payload)
            state.status = "idle";
            state.notificationsLoaded = true;
        });

        builder.addCase(fetchNotificationsAsync.rejected, (state) => {
            state.status = "idle";
        });


    })
})

export const notificationsSelectors = notificationsAdapter.getSelectors<RootState>(state => state.notifications);

export const { addNotification, updateNotification, removeNotification } = notificationsSlice.actions;