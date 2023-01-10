import React, { useEffect, useState } from 'react';
import 'moment/locale/vi';
import { Form, ConfigProvider, Grid, Row, Col, Button, Upload, Modal } from 'antd';
import Image from 'next/image';

import {
    CameraOutlined,
    CaretDownOutlined,
    CreditCardOutlined,
    IdcardOutlined,
    LoadingOutlined,
    PlusOutlined,
    UploadOutlined,
    VideoCameraAddOutlined,
} from '@ant-design/icons';
import { NameInput, NumberInput, PhoneNumberInput, SelectInput } from '@/components/form';
import style from '@/assets/Takomo.module.css';
import { phoneValid } from '@/utils/phone';
import validName from '@/utils/validName';
import UploadComponent from './components/UploadComponent';

const { useBreakpoint } = Grid;

const Payment = ({ data, user, setUser, submit, prev, handleTrackingStart, handleTrackingEnd, banks }) => {
    const [form] = Form.useForm();
    const [isBank, setIsBank] = useState(user.isBankPayment == undefined ? true : user.isBankPayment);
    const [bankList, setBankList] = useState([]);

    useEffect(() => {
        setBankList(
            banks.map((bank) => ({ label: bank.shorten_name + ' - ' + bank.sub_name, value: bank.shorten_name })),
        );
    }, [banks]);

    // useEffect(() => {
    //     form.setFieldValue('account_number', null);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isBank]);

    useEffect(() => {
        form.setFieldValue('name', user?.portrait);
        form.setFieldValue('gender', user?.front_identity);
        form.setFieldValue('phone', user?.back_identity);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const handleSubmit = () => {
        const data = form.getFieldsValue();
        console.log({ ...user, ...data });
        // submit({ ...user, ...data });
    };

    const handleSwitchPayment = (status) => {
        if (status) {
            setIsBank(true);
            setUser({ ...user, isBankPayment: true });
        } else {
            setIsBank(false);
            form.setFieldValue('bank', null);
            setUser({ ...user, isBankPayment: false });
        }
        form.setFieldValue('account_number', null);
    };

    return (
        <div
            style={{
                maxWidth: '343px',
                width: '100%',
                margin: '0 auto',
            }}
        >
            <Form form={form} name="occupation_income_form" onSubmitCapture={handleSubmit}>
                <h5 style={{ fontWeight: 700, marginBottom: 12 }}>Phương thức nhận tiền</h5>

                <Row gutter={8}>
                    <Col span={12}>
                        <Button
                            size="large"
                            style={{
                                width: '100%',
                                backgroundColor: isBank ? '#7209B7' : '',
                                color: isBank ? '#FFFFFF' : '#000000',
                                fontFamily: 'Montserrat',
                            }}
                            className={style.button}
                            onClick={() => handleSwitchPayment(true)}
                        >
                            Qua ngân hàng
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button
                            size="large"
                            style={{
                                width: '100%',
                                backgroundColor: !isBank ? '#7209B7' : '',
                                color: !isBank ? '#FFFFFF' : '#000000',
                                fontFamily: 'Montserrat',
                            }}
                            className={style.button}
                            onClick={() => handleSwitchPayment(false)}
                        >
                            Qua momo
                        </Button>
                    </Col>
                </Row>

                {/* Bank Payment */}
                {isBank && (
                    <div style={{ marginTop: '12px' }}>
                        <SelectInput
                            options={bankList}
                            showSearch
                            notFoundContent={<span>Không tìm thấy</span>}
                            name="bank"
                            placeholder="Ngân hàng"
                            size="large"
                            onSelect={(value) => {
                                setUser({ ...user, bank: value });
                                handleTrackingEnd('bank', value);
                            }}
                            initialValue={user.bank}
                            onBlur={() => handleTrackingEnd('bank', form.getFieldValue('bank'))}
                            onFocus={() => handleTrackingStart('bank')}
                        />
                        <NumberInput
                            controls={false}
                            name="account_number"
                            placeholder="Số tài khoản"
                            onChange={(value) => setUser({ ...user, account_number: value })}
                            initialValue={user.account_number}
                            size="large"
                            type="number"
                            required_message="Vui lòng nhập số tài khoản ngân hàng nhận tiền"
                            onFocus={() => handleTrackingStart('account_number')}
                            onBlur={(e) => handleTrackingEnd('account_number', e.target.value)}
                        />
                    </div>
                )}

                {/* Momo Payment */}
                {!isBank && (
                    <div style={{ marginTop: '12px' }}>
                        <NumberInput
                            controls={false}
                            name="account_number"
                            onChange={(value) => setUser({ ...user, account_number: value })}
                            placeholder="Số điện thoại/Số tài khoản"
                            initialValue={user.account_number}
                            required_message="Vui lòng nhập số điện thoại / số tài khoản ví Momo"
                            onFocus={() => handleTrackingStart('account_number')}
                            onBlur={(e) => handleTrackingEnd('account_number', e.target.value)}
                            type="number"
                            size="large"
                        />
                    </div>
                )}

                <SelectInput
                    name="purpose"
                    placeholder="Mục đích vay"
                    size="large"
                    options={data.purposes}
                    onSelect={(value) => {
                        setUser({ ...user, purpose: value });
                        handleTrackingEnd('purpose', value);
                    }}
                    initialValue={user.purpose}
                    onBlur={() => handleTrackingEnd('purpose', form.getFieldValue('purpose'))}
                    onFocus={() => handleTrackingStart('purpose')}
                />

                <h5 style={{ fontWeight: 700, marginBottom: 12 }}>Chụp ảnh đối chiếu</h5>

                <UploadComponent
                    label="Chụp khuôn mặt"
                    uploadIcon={<CameraOutlined className={style.upload_icon} />}
                    required={true}
                    placeholder="Chụp ảnh chân dung"
                    name="portrait"
                    initialValue={user.portrait}
                    onChange={(value) => {
                        console.log({ ...user, portrait: value });
                        setUser({ ...user, portrait: value });
                    }}
                />

                <UploadComponent
                    label="Chụp mặt trước CMND hoặc CCCD"
                    uploadIcon={<IdcardOutlined className={style.upload_icon} />}
                    required={true}
                    placeholder="Chụp ảnh chân dung"
                    initialValue={user.front_identity}
                    name="front_identity"
                    onChange={(value) => {
                        setUser({ ...user, front_identity: value });
                    }}
                />

                <UploadComponent
                    label="Chụp mặt sau CMND hoặc CCCD"
                    uploadIcon={<CreditCardOutlined className={style.upload_icon} />}
                    required={true}
                    placeholder="Chụp ảnh chân dung"
                    name="back_identity"
                    initialValue={user.back_identity}
                    onChange={(value) => {
                        setUser({ ...user, back_identity: value });
                    }}
                />
                <Row gutter={16} style={{ marginTop: 16 }}>
                    <Col span={12}>
                        <Button
                            size="large"
                            style={{
                                backgroundColor: '#E0E0E0',
                                width: '100%',
                            }}
                            className={style.button}
                            onClick={prev}
                        >
                            Quay lại
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Form.Item shouldUpdate>
                            {() => {
                                return (
                                    <Button
                                        size="large"
                                        htmlType="submit"
                                        style={{ width: '100%', fontWeight: 'bold' }}
                                        disabled={
                                            isBank
                                                ? !(
                                                      form.getFieldValue('account_number') &&
                                                      form.getFieldValue('portrait') !== undefined &&
                                                      form.getFieldValue('front_identity') !== undefined &&
                                                      form.getFieldValue('back_identity') !== undefined &&
                                                      form.getFieldValue('purpose') &&
                                                      form.getFieldValue('bank')
                                                  )
                                                : !(
                                                      form.getFieldValue('account_number') &&
                                                      form.getFieldValue('portrait') !== undefined &&
                                                      form.getFieldValue('front_identity') !== undefined &&
                                                      form.getFieldValue('back_identity') !== undefined &&
                                                      form.getFieldValue('purpose')
                                                  ) ||
                                                  form.getFieldsError().filter(({ errors }) => errors.length).length
                                        }
                                        className={style.submit_button}
                                    >
                                        Tiếp tục
                                    </Button>
                                );
                            }}
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Payment;
