import { AnyAction, createStore, applyMiddleware, Store } from "redux";
import { createWrapper, Context } from 'next-redux-wrapper'
import { reducer, RootState } from './reducers/'
import thunk, { ThunkDispatch } from "redux-thunk";


const makeStore = (context: Context) => createStore(reducer, applyMiddleware(thunk));

export const wrapper = createWrapper<Store<RootState>>(makeStore, { debug: true });

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>
