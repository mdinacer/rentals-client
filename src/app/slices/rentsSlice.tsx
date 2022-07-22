import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import agent from '../api/agent';
import { MetaData } from '../models/pagination';
import { Rent } from '../models/rent';
import { RentParams, getAxiosRentParams } from '../models/rentParams';
import { RootState } from '../store/configureStore';

interface RentsState {
  rentsLoaded: boolean;
  status: string;
  rentParams: RentParams;
  metaData: MetaData | null;
}

const rentsAdapter = createEntityAdapter<Rent>({
  selectId: (rent) => rent.id,
  //sortComparer: (a, b) => a.creationDate.localeCompare(b.creationDate),
});

export const fetchRentsAsync = createAsyncThunk<
  Rent[],
  void,
  { state: RootState }
>('rent/fetchRentsAsync', async (_, thunkApi) => {
  const rentParams = thunkApi.getState().rents.rentParams;
  const params = getAxiosRentParams(rentParams);
  try {
    const response = await agent.Rents.list(params);

    thunkApi.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error: any) {
    return thunkApi.rejectWithValue({ error: error.data });
  }
});

export const fetchRentAsync = createAsyncThunk<Rent, string>(
  'rent/fetchRentAsync',
  async (slug: string, thunkApi) => {
    try {
      return await agent.Rents.getActiveRequest(slug);
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

function initParams() {
  return {
    pageNumber: 1,
    pageSize: 9,
    orderBy: 'status',
  };
}

export const rentsSlice = createSlice({
  name: 'rents',
  initialState: rentsAdapter.getInitialState<RentsState>({
    rentsLoaded: false,
    status: 'idle',
    rentParams: initParams(),
    metaData: null,
  }),
  reducers: {
    setRentParams: (state, action) => {
      state.rentsLoaded = false;
      state.rentParams = {
        ...state.rentParams,
        ...action.payload,
        pageNumber: 1,
      };
    },

    setPageNumber: (state, action) => {
      state.rentsLoaded = false;
      state.rentParams = { ...state.rentParams, ...action.payload };
    },

    setPageSize: (state, action) => {
      state.rentsLoaded = false;
      state.rentParams = { ...state.rentParams, ...action.payload };
    },

    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetRentParams: (state) => {
      state.rentParams = initParams();
    },
    setRent: rentsAdapter.addOne,
    updateRent: rentsAdapter.updateOne,
    removeRent: rentsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRentsAsync.pending, (state) => {
      state.status = 'pendingFetchRents';
    });

    builder.addCase(fetchRentsAsync.fulfilled, (state, action) => {
      rentsAdapter.setAll(state, action.payload);
      state.status = 'idle';
      state.rentsLoaded = true;
    });

    builder.addCase(fetchRentsAsync.rejected, (state) => {
      state.status = 'idle';
    });

    builder.addCase(fetchRentAsync.pending, (state) => {
      state.status = 'pendingFetchRent';
    });

    builder.addCase(fetchRentAsync.fulfilled, (state, action) => {
      rentsAdapter.upsertOne(state, action.payload);
      state.status = 'idle';
    });

    builder.addCase(fetchRentAsync.rejected, (state) => {
      state.status = 'idle';
    });
  },
});

export const rentSelectors = rentsAdapter.getSelectors<RootState>(
  (state) => state.rents
);

export const {
  setRentParams,
  resetRentParams,
  setMetaData,
  setPageNumber,
  setPageSize,
  setRent,
  updateRent,
  removeRent,
} = rentsSlice.actions;
