// todo
import { actions } from "./actions";
import clone from 'ramda/src/clone';


const initState = {
  isBaseLoaded : false,
};

const incCurrentId = (state) => {
  const newState = clone(state);
  newState.base.curentID = ++newState.base.curentID;
  return newState;
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.MAGAZIN_LOAD_BASE: return {...state, base: action.payload}
    case actions.MAGAZIN_SET_ISBASE: return { ...state, isBaseLoaded : action.payload };
    case actions.MAGAZAN_INC_CURRENT_ID: return incCurrentId(state) ;
    case actions.MAGAZIN_BASE_UPDATE: return {...state, base: action.payload} ;
    default: return state;
  }

};

export { reducer };
