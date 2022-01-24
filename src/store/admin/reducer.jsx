// todo
import { actions } from "./actions";


const initState = {
  activeMenuItem: null,
  isModalVisible: false,
  rootId: null,
  formAddInputRoot : null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions. ADM_SET_MENU_CURRENT: return {...state, activeMenuItem: action.payload}
    case actions.ADM_SET_INPUT_MODAL_VISIBL: return {...state, isModalVisible: action.payload}
    case actions.ADM_SET_ROOT_ID: return {...state, rootId: action.payload}
    case actions.ADM_SET_INPUT_MODAL_ROOT: return {...state, formAddInputRoot: action.payload}
    default: return state;
  }

};

export { reducer };
