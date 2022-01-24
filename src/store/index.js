import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { reducer as admReducer } from './admin';
import { reducer as magazinReducer } from './magazin';



const rootReducer = combineReducers(
  {
    admin : admReducer,
    magazin: magazinReducer
  }
); 

const myMiddleware = applyMiddleware(thunk);
const devtool = composeWithDevTools(myMiddleware);
const store = createStore( rootReducer, devtool /*myMiddleware */ );

export { store };


