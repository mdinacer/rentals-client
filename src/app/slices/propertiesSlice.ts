import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { Property } from "../models/property";
import { PropertyParams, getAxiosPropertyParams } from "../models/propertyParams";
import { MetaData } from "../models/pagination";
import { RootState } from "../store/configureStore";

interface PropertiesState {
    propertiesLoaded: boolean;
    status: string;
    propertyParams: PropertyParams;
    metaData: MetaData | null;
}

const propertiesAdapter = createEntityAdapter<Property>({
    selectId: (Property) => Property.id,
    sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const fetchPropertiesAsync = createAsyncThunk<Property[], void, { state: RootState }>(
    "property/fetchPropertiesAsync",
    async (_, thunkApi) => {
        const PropertyParams = thunkApi.getState().properties.propertyParams;
        const params = getAxiosPropertyParams(PropertyParams);
        try {
            const response = await agent.Properties.list(params);

            thunkApi.dispatch(setMetaData(response.metaData));
            return response.items;
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data });
        }
    }
)

export const fetchPropertyAsync = createAsyncThunk<Property, string>(
    "property/fetchPropertyAsync",
    async (slug: string, thunkApi) => {
        try {
            return await agent.Properties.details(slug);
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data });
        }
    }
)

function initParams() {
    return {
        pageNumber: 1,
        pageSize: 9,
        orderBy: "title",
    }
}

export const propertiesSlice = createSlice({
    name: 'properties',
    initialState: propertiesAdapter.getInitialState<PropertiesState>({
        propertiesLoaded: false,
        status: "idle",
        propertyParams: initParams(),
        metaData: null
    }),
    reducers: {
        setPropertyParams: (state, action) => {
            state.propertiesLoaded = false;
            state.propertyParams = { ...state.propertyParams, ...action.payload, pageNumber: 1 };
        },

        setPageNumber: (state, action) => {
            state.propertiesLoaded = false;
            state.propertyParams = { ...state.propertyParams, ...action.payload };
        },

        setPageSize: (state, action) => {
            state.propertiesLoaded = false;
            state.propertyParams = { ...state.propertyParams, ...action.payload };
        },

        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },
        resetPropertyParams: (state) => {
            state.propertyParams = initParams();
        },
        setProperty: propertiesAdapter.addOne,
        updateProperty: propertiesAdapter.updateOne,
        removeProperty: propertiesAdapter.removeOne,
    },
    extraReducers: (builder => {

        builder.addCase(fetchPropertiesAsync.pending, (state) => {
            state.status = "pendingFetchProperties";
        });

        builder.addCase(fetchPropertiesAsync.fulfilled, (state, action) => {
            propertiesAdapter.setAll(state, action.payload)
            state.status = "idle";
            state.propertiesLoaded = true;
        });

        builder.addCase(fetchPropertiesAsync.rejected, (state) => {
            state.status = "idle";
        });

        builder.addCase(fetchPropertyAsync.pending, (state) => {
            state.status = "pendingFetchProperty";
        });

        builder.addCase(fetchPropertyAsync.fulfilled, (state, action) => {
            propertiesAdapter.upsertOne(state, action.payload)
            state.status = "idle";
        });

        builder.addCase(fetchPropertyAsync.rejected, (state) => {
            state.status = "idle";
        });
    })
})

export const propertySelectors = propertiesAdapter
    .getSelectors<RootState>(state => state.properties);

export const {
    setPropertyParams,
    resetPropertyParams,
    setMetaData,
    setPageNumber,
    setPageSize,
    setProperty,
    updateProperty,
    removeProperty,
} = propertiesSlice.actions;