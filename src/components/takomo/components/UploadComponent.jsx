import React, { useEffect, useState, useRef } from 'react';
import 'moment/locale/vi';
import { Button, Form, Upload, Grid } from 'antd';
import Image from 'next/image';
import PropTypes from 'prop-types';

import { CameraOutlined, LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import style from '@/assets/Takomo.module.css';

const { useBreakpoint } = Grid;

const UploadComponent = ({ label, required = false, uploadIcon, placeholder, name, initialValue, ...props }) => {
    const screen = useBreakpoint();
    const uploadRef = useRef(null);
    const [captureMode, setCaptureMode] = useState(true);

    const [fileList, setFileList] = useState([]);

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }

        if (props.onChange) {
            props.onChange(info);
        }
    };

    useEffect(() => {
        if (initialValue) {
            handleChange(initialValue);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValue]);

    const UploadButton = ({ icon, textHolder, ...props }) => {
        return (
            <div {...props} className={style.upload_component__wrap}>
                {loading ? <LoadingOutlined /> : icon}
                <div
                    style={{
                        marginTop: 8,
                        color: 'rgba(0, 0, 0, 0.45)',
                    }}
                >
                    {textHolder}
                </div>
            </div>
        );
    };

    // const handleUploadMobile = (type) => {
    //     const inputElm = document.querySelector(`input[data-id="${name}"]`);
    //     if (type === 'camera') {
    //         inputElm.setAttribute('capture', true);
    //         inputElm.click();
    //     } else {
    //         inputElm.removeAttribute('capture');
    //         inputElm.click();
    //     }
    // };

    return (
        <div className={style.upload_component}>
            <p
                style={{
                    marginBottom: '8px',
                    fontSize: 14,
                }}
            >
                {label}
                {required ? <span style={{ color: 'red' }}>*</span> : ''}
            </p>

            <Form.Item name={name} valuePropName="file" initialValue={initialValue} style={{ marginBottom: 0 }}>
                <Upload
                    name={name}
                    listType="picture-card"
                    className={style.image_uploader}
                    showUploadList={false}
                    // beforeUpload={beforeUpload}
                    onChange={handleChange}
                    style={{
                        width: '100%',
                    }}
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                >
                    {imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <Image
                            width={343}
                            height={193}
                            src={imageUrl}
                            alt="avatar"
                            style={{
                                width: '375px',
                            }}
                        />
                    ) : (
                        <UploadButton textHolder={placeholder} icon={uploadIcon} />
                    )}
                </Upload>
            </Form.Item>
        </div>
    );
};

export default UploadComponent;

UploadComponent.propTypes = {
    label: PropTypes.string,
    require: PropTypes.bool,
    uploadIcon: PropTypes.node,
    name: PropTypes.string,
    initialValue: PropTypes.object,
};
