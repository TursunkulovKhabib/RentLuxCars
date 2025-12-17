import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import carsReducer from '../features/cars/carsSlice';
import authReducer from '../features/auth/authSlice'; // 1. Импортируем

export const store = configureStore({
    reducer: {
        cars: carsReducer,
        auth: authReducer, // 2. Добавляем в reducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
