import React from 'react';
import ReactDOM from 'react-dom';
import RecipeBox from './components/RecipeBox';
import './index.css';
import { createStore } from 'redux';
import { addRecipe, editRecipe, removeRecipe, removeAll } from './actions'

import appReducer from './store/reducers'
import sampleData from'./initialState.json'

// either pulls local storeage or, if its absent, grabs from sample data
const initialState = (localStorage["redux-store"]) ?
    JSON.parse(localStorage["redux-store"]) :
    sampleData

const saveState = () =>
  localStorage["redux-store"] = JSON.stringify(store.getState())

let store = createStore();
store.subscribe(saveState)

window.React = React
window.store = store
