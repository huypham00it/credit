import React, { useEffect, useState } from 'react';
import 'moment/locale/vi';
import { Form, Row, Col, Button } from 'antd';
import { motion } from 'framer-motion';

import { CaretDownOutlined, InfoCircleFilled } from '@ant-design/icons';
import { BaseInput, SelectInput, TextInput } from '@/components/form';
import takomoStyle from '@/assets/Takomo.module.css';
import validText from '@/utils/validText';
import { fadeIn } from '@/utils/motion';

const AddressWork = ({ data, user, setUser, next, prev, handleTrackingStart, handleTrackingEnd, ...props }) => {
    const [form] = Form.useForm();
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const handleSubmit = () => {
        const data = form.getFieldsValue();
        next(data);
    };

    useEffect(() => {
        form.setFieldsValue('district', null);
        setDistricts(props.currentProvince.districts.map((elm) => ({ label: elm.name, value: elm.name })));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.currentProvince]);

    const handleSelectDistrict = (value) => {
        form.setFieldValue('ward', null);
        const district = props.currentProvince.districts.find((item) => item.name === value);
        setWards(district.wards.map((elm) => ({ label: elm.name, value: elm.name })));
    };

    return (
        <Form form={form} name="occupation_income_form" onSubmitCapture={handleSubmit}>
            <h5 style={{ fontWeight: 700, marginBottom: 12 }}>Địa chỉ cư trú</h5>

            {/* <TextInput
                    size="large"
                    name="workplace"
                    placeholder="Thành phố"
                    onChange={(e) => {
                        if (validText(e.target.value)) {
                            setUser({ ...user, workplace: e.target.value });
                        }
                    }}
                    required_message="Vui lòng nhập Thành phố"
                    error_message="Vui lòng nhập Thành phố"
                    initialValue={user.workplace}
                    onFocus={() => handleTrackingStart('workplace')}
                    onBlur={(e) => handleTrackingEnd('workplace', e.target.value)}
                /> */}

            <SelectInput
                size="large"
                name="district"
                placeholder="Thị trấn/Quận"
                required_message="Vui lòng chọn quận / huyện cư trú"
                options={districts}
                initialValue={user.district}
                onSelect={(value) => {
                    setUser({ ...user, district: value });
                    handleTrackingEnd('district', value);
                    handleSelectDistrict(value);
                }}
                onFocus={() => handleTrackingStart('district')}
                onBlur={(e) => handleTrackingEnd('district', e.target.value)}
            />

            <SelectInput
                size="large"
                name="ward"
                options={wards}
                placeholder="Phường"
                notFoundContent={<span>Vui lòng chọn quận / huyện cư trú</span>}
                initialValue={user.ward}
                required_message="Vui lòng chọn phường / xã / thị trấn cư trú"
                onSelect={(value) => {
                    setUser({ ...user, ward: value });
                    handleTrackingEnd('ward', value);
                }}
                onFocus={() => handleTrackingStart('ward')}
                onBlur={(e) => handleTrackingEnd('ward', e.target.value)}
            />

            <BaseInput
                size="large"
                name="road"
                placeholder="Địa chỉ (tên chung cư, tên đường,...)"
                required_message="Vui lòng nhập địa chỉ cư trú"
                initialValue={user.road}
                onChange={(e) => {
                    setUser({ ...user, road: e.target.value });
                }}
                onFocus={() => handleTrackingStart('road')}
                onBlur={(e) => handleTrackingEnd('road', e.target.value)}
            />

            <BaseInput
                size="large"
                name="house_number"
                placeholder="Số căn hộ (không bắt buộc)"
                onChange={(e) => {
                    setUser({ ...user, house_number: e.target.value });
                }}
                required={false}
                initialValue={user.house_number}
                onFocus={() => handleTrackingStart('house_number')}
                onBlur={(e) => handleTrackingEnd('house_number', e.target.value)}
            />

            <SelectInput
                size="large"
                name="resident_time"
                options={data.resident_time}
                suffixIcon={<CaretDownOutlined />}
                placeholder="Thời gian cư trú"
                onSelect={(value) => {
                    setUser({ ...user, resident_time: value });
                    handleTrackingEnd('resident_time', value);
                }}
                initialValue={user.resident_time}
                onBlur={() => handleTrackingEnd('resident_time', form.getFieldValue('resident_time'))}
                onFocus={() => handleTrackingStart('resident_time')}
            />

            <h5 style={{ fontWeight: 700, marginBottom: 12 }}>Nơi làm việc</h5>

            <SelectInput
                size="large"
                name="job"
                options={data.job_types}
                suffixIcon={<CaretDownOutlined />}
                placeholder="Loại công việc"
                onSelect={(value) => {
                    setUser({ ...user, job: value });
                    handleTrackingEnd('job', value);
                }}
                initialValue={user.job}
                onBlur={() => handleTrackingEnd('job', form.getFieldValue('job'))}
                onFocus={() => handleTrackingStart('job')}
            />

            <SelectInput
                size="large"
                name="field"
                options={data.job_fields}
                suffixIcon={<CaretDownOutlined />}
                placeholder="Lĩnh vực hoạt động"
                onSelect={(value) => {
                    setUser({ ...user, field: value });
                    handleTrackingEnd('field', value);
                }}
                initialValue={user.field}
                onBlur={() => handleTrackingEnd('field', form.getFieldValue('field'))}
                onFocus={() => handleTrackingStart('field')}
            />

            <BaseInput
                size="large"
                name="company"
                placeholder="Tên công ty"
                required_message="Vui lòng nhập tên công ty đang làm việc"
                onChange={(e) => {
                    setUser({ ...user, company: e.target.value });
                }}
                initialValue={user.company}
                onFocus={() => handleTrackingStart('company')}
                onBlur={(e) => handleTrackingEnd('company', e.target.value)}
            />

            <TextInput
                size="large"
                name="position"
                placeholder="Chức vụ"
                onChange={(e) => {
                    if (validText(e.target.value)) {
                        setUser({ ...user, position: e.target.value });
                    }
                }}
                required_message="Vui lòng nhập chức vụ tại công ty"
                error_message="Vui lòng nhập chức vụ tại công ty"
                initialValue={user.position}
                onFocus={() => handleTrackingStart('position')}
                onBlur={(e) => handleTrackingEnd('position', e.target.value)}
            />

            <SelectInput
                name="working_time"
                size="large"
                options={data.working_time}
                suffixIcon={<CaretDownOutlined />}
                placeholder="Kinh nghiệm làm việc gần nhất"
                onSelect={(value) => {
                    setUser({ ...user, working_time: value });
                    handleTrackingEnd('working_time', value);
                }}
                initialValue={user.working_time}
                onFocus={() => handleTrackingStart('working_time')}
                onBlur={(e) => handleTrackingEnd('working_time', e.target.value)}
                fieldStyle={{ marginBottom: 12 }}
            />

            <div style={{ display: 'flex', gap: 9, alignItems: 'center', marginBottom: 12 }}>
                <InfoCircleFilled style={{ fontSize: 14, color: data.primaryColor }} />
                <span style={{ fontSize: 14 }}>
                    Ghi chú: Khoảng thời gian bạn làm việc tại nơi làm việc gần đây nhất
                </span>
            </div>

            <SelectInput
                name="income"
                size="large"
                options={data.income_range}
                placeholder="Thu nhập hàng tháng"
                suffixIcon={<CaretDownOutlined />}
                onSelect={(value) => {
                    setUser({ ...user, income: value });
                    handleTrackingEnd('income', value);
                }}
                initialValue={user.income}
                onFocus={() => handleTrackingStart('income')}
                onBlur={(e) => handleTrackingEnd('income', e.target.value)}
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
                                            form.getFieldValue('income') &&
                                            form.getFieldValue('working_time') &&
                                            form.getFieldValue('position') &&
                                            form.getFieldValue('company') &&
                                            form.getFieldValue('field') &&
                                            form.getFieldValue('job') &&
                                            form.getFieldValue('resident_time') &&
                                            form.getFieldValue('road') &&
                                            form.getFieldValue('ward') &&
                                            form.getFieldValue('district')
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

export default AddressWork;
