import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { useState } from 'react';
import { FBASE_URL } from '../pages/constants';



const UploadImgs = ({ ...props }) => {

  const [uploadstate, setUpload] = useState(
    {
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-2',
          name: 'patric.png',
          status: 'done',
          url: 'https://firebasestorage.googleapis.com/v0/b/alevel-finish-base.appspot.com/o/5789_1690776471203674_1965389030700921162_n.jpg?alt=media',
        },
      ],
    }
  );


  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {return resolve(reader.result)};
      reader.onerror = error => reject(error);
    });
  }



  function beforeUpload(file, fileList) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {message.error('You can only upload JPG/PNG file!'); 
    return Upload.LIST_IGNORE;}

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {message.error('Image must smaller than 2MB!'); 
    return Upload.LIST_IGNORE;}
    return isJpgOrPng && isLt2M;
  }


  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setUpload({ ...uploadstate,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };



  const actionUpload = (componentsData) => {

    const formData = new FormData();
    formData.append('file', componentsData.file);
    formData.append('uid', componentsData.file.uid);
    formData.append('domain', 'POST');
    formData.append('filename', componentsData.file.name);

    const urlWithName = `${FBASE_URL}?name=${componentsData.file.name}`;
    fetch(urlWithName, {
      method: 'POST',
      crossDomain: true,
      headers: { Accept: 'application/json' },
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        message.info('Файл загружен');

        console.log('data',data);
        console.log('fileList',fileList);
        console.log('uid',componentsData.file.uid);

        return componentsData.onSuccess()})
      .catch(error => {
        console.log('Error fetching profile ' + error);
        message.error('Error fetching profile ' + error);
        componentsData.onError("Error uploading image");
      })
  }


  const handleCancel = () => setUpload({ ...uploadstate, previewVisible: false });

  const handleChange = ({ fileList }) => {
    setUpload({ ...uploadstate, fileList });
  }

  const handleRemove = (componentsData) => {
      console.log(componentsData);
  }


  const { previewVisible, previewImage, fileList, previewTitle } = uploadstate;
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );


  return (
    <>
      { }
      <Upload
        action={FBASE_URL}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onRemove={handleRemove}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        customRequest={actionUpload}
        {...props}
      >
        {fileList.length >= 4 ? null : uploadButton}
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