// auth

const actions = Object.freeze(
    {
        ADM_SET_MENU_CURRENT: 'admin/set_menu_current',
        ADM_SET_INPUT_MODAL_VISIBL: 'admin/set_is_inputmodal_visible',
        ADM_SET_ROOT_ID: 'admin/set_root_id',
        ADM_SET_INPUT_MODAL_ROOT: 'admin/set_input_modal_root',
    }
);

const admSetCurrent = (payload) => ({type: actions.ADM_SET_MENU_CURRENT, payload});
const setIsInputModalVisible = (payload) => ({type: actions.ADM_SET_INPUT_MODAL_VISIBL, payload}) ;
const admSetRootId = (payload) => ({type: actions.ADM_SET_ROOT_ID, payload}) ;
const admSetNewItemRoot = (payload) => ({type: actions.ADM_SET_INPUT_MODAL_ROOT, payload}) ;


export {
    actions,
    admSetCurrent,
    setIsInputModalVisible,
    admSetRootId,
    admSetNewItemRoot,
};