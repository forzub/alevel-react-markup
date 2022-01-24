// import { Upload, Modal } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';

import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


const UploadImgs = ({...props}) => {



  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </>
  );
}

export default UploadImgs;