//elements

const actions = Object.freeze(
    {
        ELEM_SPINER_LOADING_TOGGLE: 'element/spiner_loading_toggle',
        SET_SIDER_MENU_ROOT_ID: 'element/set_sider_menu_root_id',
        SET_GOODS_ORDER: 'element/set_goods_order',

    }
);

const elemSpinerLoadingToggle = () => ({type: actions.ELEM_SPINER_LOADING_TOGGLE});
const elemSetMenuRootId = ( payload ) => ( { type:actions.SET_SIDER_MENU_ROOT_ID, payload } );
const elemGoodsOrder = ( payload ) => ( { type:actions.SET_GOODS_ORDER, payload } );



export {
    actions,
    elemSpinerLoadingToggle,
    elemSetMenuRootId,
    elemGoodsOrder,
};