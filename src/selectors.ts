import { State } from "./types";

export const getData = <R>(state: State<R>) => state.data;
export const getIsFetching = <R>(state: State<R>) => state.isFetching;
export const getError = <R>(state: State<R>) => state.error;
export const getLastUpdated = <R>(state: State<R>) => state.lastUpdated;
