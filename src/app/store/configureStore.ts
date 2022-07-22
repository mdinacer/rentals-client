import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { accountSlice } from "../slices/accountSlice";

import { notificationsSlice } from "../slices/notificationsSlice";
import { propertiesSlice } from "../slices/propertiesSlice";
import { rentsSlice } from "../slices/rentsSlice";
import SocketClient from "../util/socketClient";

export const socket = new SocketClient()

export const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        properties: propertiesSlice.reducer,
        rents: rentsSlice.reducer,
        notifications: notificationsSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


