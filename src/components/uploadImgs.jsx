import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { useState } from 'react';



const UploadImgs = ({ ...props }) => {


  function getBase64(file) {
    console.log('file', file)
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const [uploadstate, setUpload] = useState(
    {
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList: [],
    }
  );


  function beforeUpload(file, fileList) {
    console.log(file)
    return false
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }


  const handlePreview = async file => {
    console.log('Preview', file)
    console.log('Preview', file.url)
    console.log('Preview', file.preview)
    console.log('Preview', file.originFileObj)

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
  }

  const handleCancel = () => 
  setUpload({ ...uploadstate, previewVisible: false });

  const handleChange = ({ fileList }) => {  
    setUpload({ ...uploadstate, fileList });
  }


  const { previewVisible, previewImage, fileList, previewTitle } = uploadstate;
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  // const aaa = <Upload />
  // console.log(aaa)

  return (
    <>
      {}
      <Upload
        action=""
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
}

export default UploadImgs;