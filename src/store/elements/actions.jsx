//elements

const actions = Object.freeze(
    {
        ELEM_SPINER_LOADING_TOGGLE: 'element/spiner_loading_toggle',

    }
);

const elemSpinerLoadingToggle = () => ({type: actions.ELEM_SPINER_LOADING_TOGGLE});



export {
    actions,
    elemSpinerLoadingToggle,

};