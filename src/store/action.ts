import { createAction } from '@reduxjs/toolkit';
import { AppDispatch, ThunkExtraArgument } from './index';
import { Offer, City } from '../types/offer.ts';
import {setAuthorizationStatus, setCity, setOffers} from './reducer.ts';
import axios from 'axios';

export const setLoading = createAction<boolean>('offers/setLoading');
export const setError = createAction<string | null>('offers/setError');

export const fetchOffersByCity = (city: City) => async (dispatch: AppDispatch, _getState: never, axiosInstance: ThunkExtraArgument) => {
  dispatch(setLoading(true));
  try {
    const response = await axiosInstance.get<Offer[]>('/offers');
    const allOffers = response.data;

    const filteredOffers = allOffers.filter((offer) => offer.city.name === city.name);
    dispatch(setOffers(filteredOffers));
    dispatch(setCity(city));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError('Failed to fetch offers.'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const login = () => async (dispatch: AppDispatch, _getState: never, axiosInstance: ThunkExtraArgument) => {
  try {
    const response = await axiosInstance.get('/login');
    if (response.status === 200) {
      dispatch(setAuthorizationStatus(true));
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      dispatch(setAuthorizationStatus(false));
    } else {
      dispatch(setError('Failed to login.'));
    }
  }
};
