import { Button } from "antd";
import { SaveOutlined } from '@ant-design/icons';

const AdmCMain = () => {


  return (<>

    <div className="adm_itm_top_menu">
      <h1 className="adm_itm_top_menu_ti">Главная Страница</h1>
      <div className="adm_top-menu_butbx">
        <Button type="button" onClick={() => null} > <SaveOutlined /> Сохранить </Button>
      </div>
    </div>
  </>);
}

export default AdmCMain;