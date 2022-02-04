import { useSelector } from 'react-redux';
import MyMenu from '../../components/menu/compMenu';
import { returnObjByIdFromBase } from '../../utils';
import { createMenusLists } from '../../utils/createMenuList';
import '../css/siderbox.css';


const SiderBox = ({ menuCB, props }) => {

    const base = useSelector(store => store.magazin.base);
    const rootId = useSelector(store => store.element.magazin_menu_root_id);
    const root_obj = returnObjByIdFromBase(base.items, rootId);

    let links = [];
    links = createMenusLists(root_obj.items, true);

    

    return (
        <>
            <MyMenu menuCB={menuCB} mode="vertical" links={links} mode="inline" />
        </>
    );
}

export default SiderBox;