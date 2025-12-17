import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchCars } from '../../api/carsApi';
import { Car } from '../../types';

// Асинхронный экшен для загрузки машин
export const getCars = createAsyncThunk('cars/getCars', async () => {
  const response = await fetchCars();
  return response;
});

interface CarsState {
  list: Car[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filter: 'all' | 'sport' | 'executive' | 'family'; // Фильтр по категориям
}

const initialState: CarsState = {
  list: [],
  status: 'idle',
  error: null,
  filter: 'all',
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<CarsState['filter']>) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCars.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCars.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(getCars.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch cars';
      });
  },
});

export const { setFilter } = carsSlice.actions;
export default carsSlice.reducer;
