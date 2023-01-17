import {
    HomeOutlined,
    IdcardOutlined,
    InfoCircleOutlined,
    ManOutlined,
    PhoneOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Col, Form, Input, notification, Row, Select, Tooltip } from 'antd';
import { useState } from 'react';

import { LocationInput } from '@/components/form';
import request from '@/utils/request';
import { validID } from '@/utils/validId';
import validName from '@/utils/validName';
import style from './style.module.css';

const genderOptions = [
    { label: 'Nam', value: 'Nam' },
    { label: 'Nữ', value: 'Nữ' },
];

const UserEdit = ({ user, handleCancel, setUser, handleSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleFinish = (values) => {
        setLoading(true);
        delete values.phone;

        request
            .post('/update_info', values)
            .then((res) => {
                setUser(res.data.data);
                notification.success({
                    message: 'Cập nhật thông tin thành công',
                    placement: 'bottomRight',
                    className: style.notification_success,
                });
                handleSuccess();
            })
            .catch((err) => {
                notification.error({
                    message: 'Cập nhật thông tin thất bại',
                    placement: 'bottomRight',
                    description: 'Vui lòng thử lại sau',
                    className: style.notification_error,
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Form form={form} className={style.form} name="account_form" onFinish={handleFinish}>
            <Form.Item
                name="name"
                initialValue={user.name}
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập đúng tên!',
                    },
                    () => ({
                        validator(_, value) {
                            if (!value || validName(value)) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Vui lòng nhập đúng tên!'));
                        },
                    }),
                ]}
            >
                <Input
                    addonBefore={<UserOutlined />}
                    autoComplete="off"
                    maxLength={50}
                    placeholder="Họ và tên"
                    size="large"
                />
            </Form.Item>

            <div style={{ display: 'flex' }}>
                <div
                    className="ant-input-group-addon"
                    style={{ height: '40px', width: 39, display: 'flex', alignItems: 'center' }}
                >
                    <ManOutlined />
                </div>
                <Form.Item name="gender" initialValue={user.gender} style={{ flex: 1 }}>
                    <Select options={genderOptions} size="large" />
                </Form.Item>
            </div>

            <Form.Item name="phone" initialValue={user.phone} className={style.phone_input}>
                <Input
                    addonBefore={<PhoneOutlined />}
                    size="large"
                    disabled={true}
                    suffix={
                        <Tooltip
                            title="Đây là thông tin mặc định của
                    tài khoản, không thể thay đổi"
                            overlayClassName={style.phone_tooltip}
                            overlayInnerStyle={{
                                textAlign: 'center',
                                fontSize: 14,
                            }}
                        >
                            <InfoCircleOutlined
                                style={{ color: 'rgba(0,0,0,.45)', backgroundColor: '#cec8fd', borderRadius: '50%' }}
                            />
                        </Tooltip>
                    }
                />
            </Form.Item>

            <Form.Item
                name="id_card"
                initialValue={user.id_card}
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập CMND/CCCD',
                    },
                    () => ({
                        validator(_, value) {
                            if (!value || validID(value)) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Số CMND/CCCD phải bao gồm 9 hoặc 12 số'));
                        },
                    }),
                ]}
            >
                <Input addonBefore={<IdcardOutlined />} size="large" />
            </Form.Item>

            <LocationInput
                form={form}
                edit={false}
                addonBefore={<HomeOutlined />}
                size="large"
                handleAddressSelect={() => {}}
                initialValue={user.address}
                name="address"
            />

            <Form.Item shouldUpdate>
                {() => {
                    return (
                        <Row gutter={16}>
                            <Col span={12}>
                                <Button
                                    style={{ background: '#f5f5f5' }}
                                    onClick={handleCancel}
                                    size="large"
                                    block
                                    danger
                                    type="text"
                                >
                                    Hủy
                                </Button>
                            </Col>
                            <Col span={12}>
                                <Button
                                    size="large"
                                    block
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    disabled={
                                        !(
                                            form.getFieldValue('name') &&
                                            form.getFieldValue('address') &&
                                            form.getFieldValue('phone') &&
                                            form.getFieldValue('gender') &&
                                            form.getFieldValue('id_card')
                                        ) || form.getFieldsError().filter(({ errors }) => errors.length).length
                                    }
                                >
                                    Lưu
                                </Button>
                            </Col>
                        </Row>
                    );
                }}
            </Form.Item>
        </Form>
    );
};

export default UserEdit;
