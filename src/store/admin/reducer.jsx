// todo
import { clone } from "ramda";
import { actions } from "./actions";



const initState = {
  activeMenuItem: null,
  isModalVisible: false,
  rootId: null,
  formAddInputRoot: null,

  content_title: null,
  content_type: null,
  content_show: null,
  content_description: null,
  content_textContent: null,
  
  content_image: null,
  content_params: null,
  content_price: null,

  content_cat_image: null,

  save_active: true,
  current_user: null,
};


const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.ADM_SET_MENU_CURRENT: return { ...state, activeMenuItem: action.payload }
    case actions.ADM_SET_INPUT_MODAL_VISIBL: return { ...state, isModalVisible: action.payload }
    case actions.ADM_SET_ROOT_ID: return { ...state, rootId: action.payload }
    case actions.ADM_SET_INPUT_MODAL_ROOT: return { ...state, formAddInputRoot: action.payload }
    case actions.ADM_SET_CURRENT_USER : return {...state, current_user : action.payload }

    case actions.ADM_FORM_SET_FORMS_FIELDS: return { ...state, ...action.payload };
    default: return state;
  }

};

export { reducer };
