import React, { useEffect } from 'react';
import locale from 'antd/lib/locale/vi_VN';
import 'moment/locale/vi';
import { Form, Button, DatePicker, Input } from 'antd';
import moment from 'moment';
import { CaretDownOutlined, InfoCircleFilled } from '@ant-design/icons';
import { motion } from 'framer-motion';

import { SelectInput, EmailInput, PasswordInput } from '@/components/form';
import { PrefillInfo } from '@/components/ldp';
import takomoStyle from '@/assets/Takomo.module.css';
import { fadeIn } from '@/utils/motion';
import axios from 'axios';

const PersonalInfomation = ({ next, user, data, handleTrackingStart, handleTrackingEnd }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldValue('name', user?.name);
        form.setFieldValue('gender', user?.gender);
        form.setFieldValue('phone', user?.phone);
        form.setFieldValue('id_card', user?.id_card);
        form.setFieldValue('email', user?.email);

        if (user?.phone) {
            axios.post(
                data.api_check_phone,
                { data: { phone: user.phone } },
                {
                    withCredentials: true,
                },
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const handleSubmit = () => {
        const data = {
            ...form.getFieldsValue(),
            birthday: form.getFieldValue('birthday').format('DD/MM/YYYY'),
            name: form.getFieldValue('name').trim(),
        };
        next(data, 'information');
    };

    return (
        <div
            style={{
                maxWidth: '343px',
                width: '100%',
                margin: '0 auto',
            }}
        >
            <Form form={form} name="personal_info_form">
                <h5 style={{ fontWeight: 700, marginBottom: 12 }}>Thông tin cá nhân</h5>

                <PrefillInfo
                    form={form}
                    handleTrackingStart={handleTrackingStart}
                    handleTrackingEnd={handleTrackingEnd}
                    phoneMaxLength={8}
                    phoneRuleMsg="Định dạng của số điện thoại không đúng"
                    nameRuleMsg="Định dạng họ và tên không đúng"
                    idRuleMsg="Định dạng số CMND hoặc CCCD không đúng"
                />

                <SelectInput
                    size="large"
                    name="marital_status"
                    options={data.marital_status}
                    placeholder="Tình trạng hôn nhân"
                    suffixIcon={<CaretDownOutlined />}
                    initialValue={user?.marital_status}
                    onBlur={() => handleTrackingEnd('marital_status', form.getFieldValue('marital_status'))}
                    onFocus={() => handleTrackingStart('marital_status')}
                    onSelect={(value) => handleTrackingEnd('marital_status', value)}
                />

                <Form.Item
                    name="birthday"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn chưa chọn ngày sinh',
                        },
                        () => ({
                            validator(_, value) {
                                const currentYear = new Date().getFullYear();
                                if (
                                    !value ||
                                    (currentYear - moment(value).year() >= 22 &&
                                        currentYear - moment(value).year() <= 60)
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Độ tuổi vừa nhập không phù hợp (từ 22-60 tuổi)'));
                            },
                        }),
                    ]}
                    initialValue={user?.birthday ? moment(user.birthday, 'DD/MM/YYYYY') : null}
                >
                    <DatePicker
                        format="DD/MM/YYYY"
                        locale={locale}
                        style={{ width: '100%' }}
                        placeholder="Ngày sinh"
                        size="large"
                        onFocus={() => handleTrackingStart('birthday')}
                        onBlur={(e) => handleTrackingEnd('birthday', e.target.value)}
                        onSelect={(e) => handleTrackingEnd('birthday', moment(e).format('DD-MM-YYYY'))}
                    />
                </Form.Item>

                <h5 style={{ fontWeight: 700, marginBottom: 12 }}>Tài khoản</h5>

                <EmailInput
                    size="large"
                    name="email"
                    placeholder="Email"
                    ruleMsg="Định dạng email không đúng"
                    initialValue={user?.email}
                    onFocus={() => handleTrackingStart('email')}
                    onBlur={(e) => handleTrackingEnd('email', e.target.value)}
                />

                <PasswordInput
                    name="password"
                    pattern={'[a-zA-Z\\d\\W]{4,}'}
                    placeholder="Tạo mật khẩu"
                    size="large"
                    min={4}
                    initialValue={user?.password}
                    maxLength={8}
                    onFocus={() => handleTrackingStart('password')}
                    onBlur={(e) => handleTrackingEnd('password', e.target.value)}
                />

                <div style={{ display: 'flex', gap: 9, alignItems: 'center', marginBottom: 12 }}>
                    <InfoCircleFilled style={{ fontSize: 14, color: data.primaryColor }} />
                    <span style={{ fontSize: 14 }}>Mật khẩu tối thiểu 04 ký tự</span>
                </div>

                {/* CONFIRM_PASSWORD */}
                <Form.Item
                    name="confirm_password"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Bạn chưa nhập mật khẩu',
                        },
                        () => ({
                            validator(_, value) {
                                if (!value || (value.length >= 4 && /[a-zA-Z\d\W]{4,}/.test(value))) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu cần tối thiểu 4 ký tự số'));
                            },
                        }),
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue('password') === value ||
                                    value.length < 4 ||
                                    !/[a-zA-Z\d\W]{4,}/.test(value)
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu cung cấp không trùng khớp'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        size="large"
                        placeholder="Nhập lại mật khẩu"
                        onFocus={() => handleTrackingStart('confirm_password')}
                        onBlur={(e) => handleTrackingEnd('confirm_password', e.target.value)}
                    />
                </Form.Item>

                <Form.Item shouldUpdate>
                    {() => {
                        return (
                            <Button
                                size="large"
                                style={{ width: '100%', fontWeight: 'bold' }}
                                disabled={
                                    !(
                                        form.getFieldValue('name') &&
                                        form.getFieldValue('address') &&
                                        form.getFieldValue('phone') &&
                                        form.getFieldValue('marital_status') &&
                                        form.getFieldValue('id_card') &&
                                        form.getFieldValue('birthday') &&
                                        form.getFieldValue('gender') &&
                                        form.getFieldValue('email') &&
                                        form.getFieldValue('password') &&
                                        form.getFieldValue('confirm_password')
                                    ) || form.getFieldsError().filter(({ errors }) => errors.length).length
                                }
                                className={takomoStyle.submit_button}
                                onClick={handleSubmit}
                            >
                                Tiếp tục
                            </Button>
                        );
                    }}
                </Form.Item>
            </Form>
        </div>
    );
};

export default PersonalInfomation;
