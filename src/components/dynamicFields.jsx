import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';



const DynamicFields = () => {

// const defParam = [{first: 'Poul', last: 'Vizoven'}, {first: 'Charle', last: 'Dimanche'}]

  return (
    <>
      <Form.List 
      name='params' 
      >
       
        {(fields, { add, remove }) => (
            <> 
              {fields.map(({ key, name, ...restField }) => (
                
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'param_name']}
                    rules={[{ required: true, message: 'Missing parameter name' }]}
                  >
                    <Input placeholder="Параметр" />
                  </Form.Item>
                  <Form.Item
                    {...restField} 
                    name={[name, 'param_value']}
                    rules={[{ required: true, message: 'Missing parameter value ' }]}
                  >
                    <Input placeholder="Значение параметра" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
    </>
  )
}

export default DynamicFields;