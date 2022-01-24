// magazin

const actions = Object.freeze(
    {
        MAGAZIN_LOAD_BASE: 'magazin/load_base',
        MAGAZIN_SET_ISBASE: 'magazin/load_is_base',
        MAGAZAN_INC_CURRENT_ID: 'magazin/inc_current_id',
        MAGAZIN_BASE_UPDATE: 'magazin/base_update',
    }
);

const magazinLoadBase = (payload) => ({type: actions.MAGAZIN_LOAD_BASE, payload});
const magazinSetIsBase = (payload) => ({type: actions.MAGAZIN_SET_ISBASE, payload});
const magazinIncCurrentId = () => ({type: actions.MAGAZAN_INC_CURRENT_ID});
const magazinBaseUpdate = (payload) => ({type: actions.MAGAZIN_BASE_UPDATE, payload});

const magazinLoadBaseFromServer = (payload) => (dispatch, getState) => {
    
    dispatch(magazinLoadBase(payload));
    dispatch(magazinSetIsBase(true))
}

const magazinBase_Update = (payload) => (dispatch, getState) => {
    console.log(payload);
    dispatch( magazinBaseUpdate(payload) );
}

export {
    actions,
    magazinLoadBase,
    magazinSetIsBase,
    magazinLoadBaseFromServer,
    magazinBase_Update,
    magazinIncCurrentId,
};