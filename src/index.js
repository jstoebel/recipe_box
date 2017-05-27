import React from 'react';
import RecipeBox from './components/containers/RecipeBox';
import './index.css';
import { render } from 'react-dom'
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import appReducer from './store/reducers'
import sampleData from'./initialState.json'

// either pulls local storeage or, if its absent, grabs from sample data
const initialState = (localStorage["redux-store"]) ?
    JSON.parse(localStorage["redux-store"]) :
    sampleData

let store = createStore(appReducer, initialState);

const saveState = () =>
  localStorage["redux-store"] = JSON.stringify(store.getState())

store.subscribe(saveState)

window.React = React
window.store = store

render(
	<Provider store={store}>
	   <RecipeBox />
	</Provider>,
  document.getElementById('root')
)
