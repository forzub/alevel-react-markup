// auth

const actions = Object.freeze(
    {
        ADM_SET_MENU_CURRENT: 'admin/set_menu_current',
        ADM_SET_INPUT_MODAL_VISIBL: 'admin/set_is_inputmodal_visible',
        ADM_SET_ROOT_ID: 'admin/set_root_id',
        ADM_SET_INPUT_MODAL_ROOT: 'admin/set_input_modal_root',

        ADM_FORM_SET_FORMS_FIELDS : 'admin/set_forms_fields',
        ADM_SET_CURRENT_USER: 'admin/set_current_user',
    }
);

const admSetCurrent = (payload) => ({type: actions.ADM_SET_MENU_CURRENT, payload});
const setIsInputModalVisible = (payload) => ({type: actions.ADM_SET_INPUT_MODAL_VISIBL, payload}) ;
const admSetRootId = (payload) => ({type: actions.ADM_SET_ROOT_ID, payload}) ;
const admSetNewItemRoot = (payload) => ({type: actions.ADM_SET_INPUT_MODAL_ROOT, payload}) ;
const admSetCurrentUser = (payload) => ({type: actions.ADM_SET_CURRENT_USER, payload});

const admSetFormsFields = (payload) => ( { type: actions.ADM_FORM_SET_FORMS_FIELDS, payload} );



export {
    actions,
    admSetCurrent,
    setIsInputModalVisible,
    admSetRootId,
    admSetNewItemRoot,
    admSetFormsFields,
    admSetCurrentUser,
};