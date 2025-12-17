import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@supabase/supabase-js';

interface AuthState {
    user: User | null;
    session: any | null;
}

const initialState: AuthState = {
    user: null,
    session: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload;
        },
        setSession(state, action: PayloadAction<any>) {
            state.session = action.payload;
        },
        logout(state) {
            state.user = null;
            state.session = null;
        }
    },
});

export const { setUser, setSession, logout } = authSlice.actions;
export default authSlice.reducer;
