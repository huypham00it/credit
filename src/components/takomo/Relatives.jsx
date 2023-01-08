import React from 'react';
import 'moment/locale/vi';
import { Form, Grid, Row, Col, Button } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

import { NameInput, PhoneNumberInput, SelectInput } from '@/components/form';
import takomoStyle from '@/assets/Takomo.module.css';
import { phoneValid } from '@/utils/phone';
import validName from '@/utils/validName';
import { fadeIn } from '@/utils/motion';

const { useBreakpoint } = Grid;

const Relatives = ({ data, user, setUser, next, prev, handleTrackingStart, handleTrackingEnd }) => {
    const [form] = Form.useForm();

    const handleSubmit = () => {
        const data = {
            ...form.getFieldsValue(),
        };
        next(data);
    };

    return (
        <Form form={form} name="occupation_income_form" onSubmitCapture={handleSubmit}>
            <h5 style={{ fontWeight: 700, marginBottom: 12 }}>Thông tin người thân</h5>

            <NameInput
                size="large"
                name="relative_name"
                placeholder="Họ và tên"
                initialValue={user.relative_name}
                requiredMsg="Vui lòng nhập họ và tên người liên hệ"
                ruleMsg="Định dạng họ và tên không đúng"
                onChange={(e) => {
                    if (validName(e.target.value)) {
                        setUser({ ...user, relative_name: e.target.value });
                    }
                }}
                onFocus={() => handleTrackingStart('relative_name')}
                onBlur={(e) => handleTrackingEnd('relative_name', e.target.value)}
            />

            <SelectInput
                size="large"
                name="relative"
                placeholder="Quan hệ thân nhân"
                options={data.personal_relations}
                initialValue={user.relative}
                onSelect={(value) => {
                    setUser({ ...user, relative: value });
                    handleTrackingEnd('relative', value);
                }}
                suffixIcon={<CaretDownOutlined />}
                onFocus={() => handleTrackingStart('relative')}
                onBlur={(e) => handleTrackingEnd('relative', e.target.value)}
            />

            <PhoneNumberInput
                name="relative_phone"
                placeholder="Số điện thoại"
                size="large"
                maxLength={10}
                initialValue={user.relative_phone}
                requiredMsg="Vui lòng nhập số điện thoại của người thân"
                ruleMsg="Định dạng số điện thoại không đúng"
                existsMsg="Số điện thoại liên hệ đã tồn tại"
                exists={[user.colleague_phone, user.phone]}
                onChange={(e) => {
                    if (phoneValid(e.target.value)) {
                        setUser({ ...user, relative_phone: e.target.value });
                    }
                }}
                onFocus={() => handleTrackingStart('relative_phone')}
                onBlur={(e) => handleTrackingEnd('relative_phone', e.target.value)}
            />

            <h5 style={{ fontWeight: 700, marginBottom: 12 }}>Thông tin đồng nghiệp</h5>

            <NameInput
                size="large"
                name="colleague_name"
                placeholder="Họ và tên"
                initialValue={user.colleague_name}
                requiredMsg="Vui lòng nhập họ và tên đồng nghiệp"
                ruleMsg="Định dạng họ và tên không đúng"
                onChange={(e) => {
                    if (validName(e.target.value)) {
                        setUser({ ...user, colleague_name: e.target.value });
                    }
                }}
                onFocus={() => handleTrackingStart('colleague_name')}
                onBlur={(e) => handleTrackingEnd('colleague_name', e.target.value)}
            />

            <PhoneNumberInput
                name="colleague_phone"
                placeholder="Số điện thoại"
                size="large"
                maxLength={10}
                initialValue={user.colleague_phone}
                requiredMsg="Vui lòng nhập số điện thoại đồng nghiệp"
                ruleMsg="Định dạng số điện thoại không đúng"
                existsMsg="Số điện thoại liên hệ đã tồn tại"
                exists={[user.relative_phone, user.phone]}
                onChange={(e) => {
                    if (phoneValid(e.target.value)) {
                        setUser({ ...user, colleague_phone: e.target.value });
                    }
                }}
                onFocus={() => handleTrackingStart('colleague_phone')}
                onBlur={(e) => handleTrackingEnd('colleague_phone', e.target.value)}
            />

            <Row gutter={16}>
                <Col span={12}>
                    <Button
                        size="large"
                        style={{
                            backgroundColor: '#E0E0E0',
                            width: '100%',
                        }}
                        className={takomoStyle.button}
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
                                        !(
                                            form.getFieldValue('relative_name') &&
                                            form.getFieldValue('relative_phone') &&
                                            form.getFieldValue('relative') &&
                                            form.getFieldValue('colleague_name') &&
                                            form.getFieldValue('colleague_phone')
                                        ) || form.getFieldsError().filter(({ errors }) => errors.length).length
                                    }
                                    className={takomoStyle.submit_button}
                                >
                                    Tiếp tục
                                </Button>
                            );
                        }}
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default Relatives;
