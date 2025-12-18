import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../lib/supabase';

export const getCars = createAsyncThunk(
    'cars/getCars',
    async (_, { rejectWithValue }) => {
      try {
        console.log('Redux: Начинаем загрузку авто из Supabase...');

        const { data, error } = await supabase
            .from('cars')
            .select('*');

        console.log('Supabase Response:', { data, error });

        if (error) {
          console.error('Ошибка Supabase:', error);
          throw error;
        }

        console.log('Загружено машин:', data?.length || 0);
        return data || [];
      } catch (error: any) {
        console.error(' Catch ошибка:', error);
        return rejectWithValue(error.message);
      }
    }
);

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    list: [] as any[],
    status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
    filter: 'all' as 'all' | 'sport' | 'executive' | 'family',
    error: null as string | null,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(getCars.pending, (state) => {
          console.log('⏳ Redux: status → loading');
          state.status = 'loading';
        })
        .addCase(getCars.fulfilled, (state, action) => {
          console.log('🎉 Redux: status → succeeded, машин:', action.payload.length);
          state.status = 'succeeded';
          state.list = action.payload;
        })
        .addCase(getCars.rejected, (state, action) => {
          console.error('💔 Redux: status → failed', action.payload);
          state.status = 'failed';
          state.error = action.payload as string;
        });
  },
});

export const { setFilter } = carsSlice.actions;
export default carsSlice.reducer;
