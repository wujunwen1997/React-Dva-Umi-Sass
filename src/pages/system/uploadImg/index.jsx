import React, { Component } from 'react';
import { Upload, Icon, Modal, message } from 'antd';
import { connect } from 'dva'
import http from '@/api/config/api';
import {delImg} from '@/api/systemManagement/upload.js';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
function getBase64Two(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小不能超过2M');
  }
  return isLt2M;
}
@connect(({loading, upload}) => ({loading, upload}))
class RouterComponent extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    imageUrl: '',
    url: '',
    loading: false,
  };

  handleCancel = () => this.setState({ previewVisible: false });
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
  handleChange = ({ file, fileList }) => {
    this.props.dispatch({
      type: 'upload/setLocale',
      payload: {
        fileList
      },
    })
    if (file.status === 'error') {
      message.error(file.response.msg);
    } else if (file.status === 'done') {
      message.success('图片上传成功');
    }
  };
  render() {
    const { previewVisible, previewImage, imageUrl } = this.state;
    const { fileList } = this.props.upload;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const uploadButton2 = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const onRemove = (file) => {
      return new Promise((resolve, reject) => {
        http(delImg({name: file.name})).then(res => {
          if (res) {
            resolve(false)
          } else {
            resolve()
          }
        }).catch(err => {
          resolve(false)
        })
      })
    }
    const baseDone = ({ file, fileList, event }) => {
      if (file.status === 'uploading') {
        this.setState({ loading: true });
        return;
      }
      if (file.status === 'done') {
        getBase64Two(file.originFileObj, imageUrl =>
          this.setState({
            imageUrl,
            loading: false,
          })
        );
        this.props.dispatch({
          type: 'user/getHeadImg'
        })
      }
    };
    return (
      <div style={{padding: '50px'}}>
       <div style={{width: '100%',height: '180px'}}>
         <p>照片墙：stream模式（每个用户限制最多传3张）</p>
         <Upload
           action="/api/upload"
           listType="picture-card"
           accept={'.jpg,.jpeg, .png'}
           beforeUpload={beforeUpload}
           fileList={fileList}
           onPreview={this.handlePreview}
           onChange={this.handleChange}
           onRemove={onRemove}
         >
           {fileList.length >= 3 ? null : uploadButton}
         </Upload>
         <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
           <img alt="example" style={{ width: '100%' }} src={previewImage} />
         </Modal>
       </div>
        <div>
          <p>头像：base64,file模式</p>
          <Upload
            name="avatar"
            listType="picture-card"
            showUploadList={false}
            action="/api/uploadFile"
            beforeUpload={beforeUpload}
            onChange={baseDone}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton2}
          </Upload>
        </div>
      </div>
    );
  }
}

export default RouterComponent;
