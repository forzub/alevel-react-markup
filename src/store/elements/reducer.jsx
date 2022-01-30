//elements

import { actions } from "./actions";



const initState = {
  spinerLoading : false,

};


const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.ELEM_SPINER_LOADING_TOGGLE: return { ...state, spinerLoading: !state.spinerLoading }

    default: return state;
  }

};

export { reducer };
