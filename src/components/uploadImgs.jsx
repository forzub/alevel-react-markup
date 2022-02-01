import { Upload, Modal, message, Form, Input, Button, Space } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import { useEffect, useState } from 'react';
import { FBASE_URL } from '../pages/constants';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { admSetFormsFields } from '../store/admin';
import { magazinBase_Update } from '../store/magazin';





const UploadImgs = ({ adminImgList, target_key, props, maxCount = 4, onUpdateImageList  }) => {

  const dispatch = useDispatch();
  // const admin_fields = useSelector(store => store.admin);
  // const imagesList = admin_fields?.content_image || [];
  const imagesList = adminImgList || [];

  const [uploadstate, setUpload] = useState(
    {
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList: []
    }
  );

  useEffect(() => setUpload({ ...uploadstate, fileList: imagesList }), [imagesList]);



  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => { return resolve(reader.result) };
      reader.onerror = error => reject(error);
    });
  }


  function beforeUpload(file, uploadstate) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
      return Upload.LIST_IGNORE;
    }
    return isJpgOrPng && isLt2M;
  }

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setUpload({
      ...uploadstate,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };



  const handleCancel = () => setUpload({ ...uploadstate, previewVisible: false });
  const handleChange = ({ fileList }) => {setUpload({ ...uploadstate, fileList }); }



  const actionUpload = (componentsData) => {

    let filename = Date.now() + componentsData.file.name.slice(componentsData.file.name.lastIndexOf('.'));

    const formData = new FormData();
    formData.append('file', componentsData.file);
    formData.append('uid', componentsData.file.uid);
    formData.append('domain', 'POST');
    formData.append('filename', filename);

    const urlWithName = `${FBASE_URL}?name=${filename}`;
    fetch(urlWithName, {
      method: 'POST',
      crossDomain: true,
      headers: { Accept: 'application/json' },
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        message.info('Файл загружен');

        let fileinfo = fileList[fileList.length - 1];

        imagesList.push({
          uid: fileinfo.uid,
          name: data.name,
          status: 'done',
          url: `${FBASE_URL}/${filename}?alt=media`,
        });

        // dispatch(admSetFormsFields({ content_image: imagesList }));
        
        dispatch(admSetFormsFields({ [target_key] : imagesList }));
        onUpdateImageList(imagesList);

        setUpload({ ...uploadstate, fileList: imagesList });
        return componentsData.onSuccess();
      })
      .catch(error => {
        console.log('Error fetching profile ' + error);
        message.error('Error fetching profile ' + error);
        componentsData.onError("Error uploading image");
      })
  }





  const handleRemove = (componentsData) => {
    let [currentImage] = imagesList.filter(el =>
      el.uid === componentsData.uid);

    const urlWithName = `${FBASE_URL}/${currentImage.name}`;
    fetch(urlWithName, {
      method: 'DELETE',
      crossDomain: true,
      headers: { Accept: 'application/json' },
    })
      .then(response => {
        switch (true) {
          case (response.status === 200): return response.json();
          case (response.status < 400): return null;
        }
      })
      .then(data => {
        message.info('Файл удален');  
        
        let newImagesList = imagesList.filter(el =>
          el.uid !== componentsData.uid
        );

        // dispatch(admSetFormsFields( { content_image: newImagesList } ) );
        dispatch(admSetFormsFields( {  [target_key] : newImagesList } ) );
        onUpdateImageList(newImagesList);
        setUpload({ ...uploadstate, fileList: newImagesList });
      })
      .catch(error => {
        console.log('Error fetching profile ' + error);
        message.error('Error fetching profile ' + error);
      })
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
        {fileList.length >= maxCount ? null : uploadButton}
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