// magazin

import { updateRuntime } from "../../utils/udateRuntime";
import { elemSpinerLoadingToggle } from "../elements";
import { RUNTIME_URL, MAGAZIN_LOCATION } from '../../pages/constants';

const actions = Object.freeze(
    {
        MAGAZIN_LOAD_BASE: 'magazin/load_base',
        MAGAZIN_SET_ISBASE: 'magazin/load_is_base',
        MAGAZAN_INC_CURRENT_ID: 'magazin/inc_current_id',
        MAGAZIN_BASE_UPDATE: 'magazin/base_update',
    }
);

const magazinLoadBase = (payload) => ({ type: actions.MAGAZIN_LOAD_BASE, payload });
const magazinSetIsBase = (payload) => ({ type: actions.MAGAZIN_SET_ISBASE, payload });
const magazinIncCurrentId = () => ({ type: actions.MAGAZAN_INC_CURRENT_ID });
const magazinBaseUpdate = (payload) => ({ type: actions.MAGAZIN_BASE_UPDATE, payload });

const magazinLoadBaseFromServer = () => (dispatch, getState) => {
    
    dispatch(elemSpinerLoadingToggle())
    
    fetch(`${RUNTIME_URL}${MAGAZIN_LOCATION}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            dispatch(magazinLoadBase(data));
            dispatch(magazinSetIsBase(true));
        })
        .catch(err => console.log(err))
        .finally(
          
            dispatch(elemSpinerLoadingToggle())

        );
}

const magazinBase_Update = (payload) => (dispatch, getState) => {
    updateRuntime( payload, dispatch, getState, MAGAZIN_LOCATION );
}

export {
    actions,
    magazinLoadBase,
    magazinSetIsBase,
    magazinLoadBaseFromServer,
    magazinBase_Update,
    magazinIncCurrentId,
    magazinBaseUpdate,
};