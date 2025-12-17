import { supabase } from './supabaseClient';
import { Car } from '../types';

export const fetchCars = async (): Promise<Car[]> => {
    const { data, error } = await supabase
        .from('carsSlice.ts')
        .select('*')
        .order('id', { ascending: true });

    if (error) {
        throw new Error(error.message);
    }

    return data as Car[];
};

export const fetchCarById = async (id: string): Promise<Car | null> => {
    const { data, error } = await supabase
        .from('carsSlice.ts')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data as Car;
};
