import { Button, Input, Modal, Form, Radio } from 'antd';
import { clone } from 'ramda';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsInputModalVisible } from '../store/admin';
import { magazinBase_Update } from '../store/magazin';
import { returnObjByIdFromBase, transliterate } from '../utils';



const AdmInputModal = () => {
  const dispatch = useDispatch();
  const isModalVisible = useSelector(store => store.admin.isModalVisible);
  const base = useSelector(store => store.magazin.base);
  const parentId = useSelector(store => store.admin.formAddInputRoot);
  const [pageType, setPageType] = useState('itm');



  const add_element_to_base = (value, store, parent) => {
    const base = clone(store);
    let path = `/${transliterate(value.addtext).replace(/ /ig, '_').toLowerCase()}`;


    const new_item = {
      id: base.curentID + 1,
      parent,
      content: {
        title: value.addtext,
        type: value.pagetype,
        path,
      },
    }

    const updated_object = returnObjByIdFromBase(base.items, parent, 'id');

    if (updated_object) {
      if (!('items' in updated_object)) {  updated_object.items = []; }
      updated_object.items.push(new_item);
    }
    else { base.items.push(new_item); }

    base.curentID = ++base.curentID;
    dispatch(magazinBase_Update(base));
  }





  const handleOk = (value) => {
    console.log(value)
    dispatch(setIsInputModalVisible(false));
    add_element_to_base(value, base, parentId);
  };


  const handleCancel = () => {
    dispatch(setIsInputModalVisible(false));
  };

  const onFormLayoutChange = ({ pagetype }) => {
    setPageType(pagetype);
  };

  return (
    <Modal title="Добавление элемента" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
      footer={[
        <Button form="myForm" key="submit" htmlType="submit" >
          Submit
        </Button>,
        <Button form="myForm" key="cancel" htmlType="reset" onClick={handleCancel}>
          Cancel
        </Button>,
      ]}
    >
      <Form
        name='myForm'
        onFinish={handleOk}
        autoComplete="off"
        pagetype={pageType}
        initialValues={{ pagetype: pageType }}
        onValuesChange={onFormLayoutChange}
      >

        <Form.Item
          name='addtext'
          rules={
            [
              { min: 4, message: 'не менее 4-х символов' }
            ]
          }
        >
          <Input />
        </Form.Item>
        <Form.Item label="Тип объекта" name="pagetype">
          <Radio.Group>
            <Radio.Button value="page">Страница</Radio.Button>
            <Radio.Button value="cat">Каталог</Radio.Button>
            <Radio.Button value="itm">Товар</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>

    </Modal>


  );
}

export default AdmInputModal;

