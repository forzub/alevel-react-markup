//elements

import { actions } from "./actions";



const initState = {
  spinerLoading : false,
  magazin_menu_root_id: 2,

};


const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.ELEM_SPINER_LOADING_TOGGLE: return { ...state, spinerLoading: !state.spinerLoading }
    case actions.SET_SIDER_MENU_ROOT_ID:  return { ...state, magazin_menu_root_id : action.payload }
    
    default: return state;
  }

};

export { reducer };
