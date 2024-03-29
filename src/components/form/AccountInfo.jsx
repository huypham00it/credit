import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Radio } from 'antd';
import { UserOutlined, IdcardOutlined, PhoneOutlined, HomeOutlined, DownOutlined } from '@ant-design/icons';

import validName from '@/utils/validName';
import { validID } from '@/utils/validId';
import { phoneValid } from '@/utils/phone';
import provinces from '@/utils/provinces';
import toNonAccentVietnamese from '@/utils/nonAccentVietnamese';
import filterProvince from '@/utils/filterProvince';
import styleAccountInfo from '@/assets/AccountInfo.module.css';
import signupStyle from '@/assets/Signup.module.css';
import styleAutocomplete from '@/assets/AutoComplete.module.css';
import provinces_data from '@/utils/provinces';
import useClickOutside from '@/hooks/useClickOutside';

const AccountInfo = ({ user, form }) => {
    const [filteredProvinces, setFilteredProvinces] = useState(provinces);
    const [openSuggestions, setOpenSuggestions] = useState(false);
    const [hasProvince, setHasProvince] = useState(true);
    const inputRef = useRef(null);
    const cityRef = useRef(null);

    const [customer, setCustomer] = useState({
        name: '',
        gender: '',
        id_card: '',
        phone: '',
        address: '',
    });

    useEffect(() => {
        if (user) {
            setCustomer({
                name: user.name,
                gender: user.gender,
                id_card: user.id_card,
                phone: user.phone,
                address: user.address,
            });
        }
    }, [user]);

    const handleChange = (value) => {
        if (!value.startsWith(' ')) {
            form.setFieldValue('address', value);
            filterOptions(value);
            setCustomer({ ...user, address: value });
        }
        setOpenSuggestions(true);
    };

    const filterOptions = (province) => {
        let filteredValues = filterProvince(province);

        if (!filteredValues.length > 0) {
            setHasProvince(false);
            setFilteredProvinces(provinces_data);
            return;
        }

        setHasProvince(true);
        setFilteredProvinces(filteredValues);
    };

    const handleBlur = () => {
        const currentValue = inputRef.current.input.value;
        let filteredValues = filterProvince(currentValue);
        setOpenSuggestions(false);
        if (currentValue != '') {
            const suggestOption = filteredValues.find((option) => {
                return (
                    toNonAccentVietnamese(option.value.toLowerCase()).indexOf(
                        toNonAccentVietnamese(currentValue.toLowerCase()),
                    ) !== -1
                );
            });

            if (!suggestOption) {
                setHasProvince(false);
                return;
            }

            setHasProvince(true);
            setCustomer({ ...user, address: suggestOption.value });
            form.setFieldValue('address', suggestOption.value);
            return;
        }
    };

    const handleClick = () => {
        setOpenSuggestions(!openSuggestions);
        window.scrollTo(0, document.body.scrollHeight);
    };

    const handleSelect = (value) => {
        inputRef.current.focus();
        handleChange(value);
        setOpenSuggestions(false);
        setHasProvince(true);
        form.validateFields(['address'])
            .then()
            .catch((err) => console.log(err));
    };

    useClickOutside(cityRef, () => {
        handleBlur();
    });

    return (
        <>
            {customer && customer.name && (
                <Form.Item
                    name="name"
                    rules={[
                        () => ({
                            validator(_, value) {
                                if (validName(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Vui lòng nhập đúng tên!'));
                            },
                        }),
                    ]}
                    initialValue={customer.name}
                >
                    <Input
                        autoComplete="off"
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Họ và tên"
                        disabled
                        size="large"
                    />
                </Form.Item>
            )}

            <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                <div className={[styleAccountInfo.gender_wrap, styleAccountInfo.field_disabled].join(' ')}>
                    <label>Giới tính</label>
                    {customer && customer.gender && (
                        <Form.Item name="gender" style={{ marginBottom: '0px' }} initialValue={customer.gender}>
                            <Radio.Group name="gender" label="Giới tính" disabled>
                                <Radio value="Nam"> Nam </Radio>
                                <Radio value="Nữ"> Nữ </Radio>
                            </Radio.Group>
                        </Form.Item>
                    )}
                </div>
            </div>

            {customer && customer.id_card && (
                <Form.Item
                    name="id_card"
                    rules={[
                        () => ({
                            validator(_, value) {
                                if (validID(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Số CMND/CCCD phải bao gồm 9 hoặc 12 số'));
                            },
                        }),
                    ]}
                    initialValue={customer.id_card}
                >
                    <Input
                        autoComplete="off"
                        size="large"
                        prefix={<IdcardOutlined className="site-form-item-icon" />}
                        placeholder="CMND/CCCD"
                        disabled
                        type="text"
                    />
                </Form.Item>
            )}

            {customer && customer.phone && (
                <Form.Item
                    name="phone"
                    rules={[
                        () => ({
                            validator(_, value) {
                                if (phoneValid(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Số điện thoại phải bao gồm 10 số'));
                            },
                        }),
                    ]}
                    initialValue={customer.phone}
                >
                    <Input
                        autoComplete="off"
                        prefix={<PhoneOutlined className="site-form-item-icon" />}
                        disabled
                        placeholder="Số điện thoại"
                        type="text"
                        size="large"
                    />
                </Form.Item>
            )}

            <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                <div className={styleAccountInfo.field_disabled} style={{ flex: 1 }}>
                    <Form.Item
                        className={styleAccountInfo.custom_selectbox}
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa chọn Tỉnh/Thành phố',
                            },
                            () => ({
                                validator(_, value) {
                                    if (hasProvince) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Bạn chưa chọn Tỉnh/Thành phố');
                                },
                            }),
                        ]}
                        initialValue={customer.address}
                    >
                        <div
                            style={{
                                position: 'relative',
                            }}
                            ref={cityRef}
                        >
                            <div
                                className={
                                    openSuggestions
                                        ? styleAutocomplete.suggestions_wrapper
                                        : styleAutocomplete.suggestions_hide
                                }
                            >
                                {filteredProvinces.length > 0 &&
                                    hasProvince &&
                                    filteredProvinces.map((option, i) => (
                                        <div
                                            key={i}
                                            className={signupStyle.province_suggestion__item}
                                            onClick={() => handleSelect(option.value)}
                                        >
                                            {option.label}
                                        </div>
                                    ))}

                                {!hasProvince && (
                                    <div
                                        className={signupStyle.province_suggestion__item}
                                        style={{ color: '#00000073' }}
                                    >
                                        Không tìm thấy
                                    </div>
                                )}
                            </div>

                            <Input
                                prefix={<HomeOutlined />}
                                value={customer.address}
                                ref={inputRef}
                                placeholder="Chọn Tỉnh/Thành phố"
                                autoComplete="off"
                                onChange={(e) => handleChange(e.target.value)}
                                onClick={handleClick}
                                disabled
                                onPressEnter={handleBlur}
                                size="large"
                            />

                            <DownOutlined
                                style={{
                                    position: 'absolute',
                                    right: 11,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: '#d9d9d9',
                                }}
                            />
                        </div>
                    </Form.Item>
                </div>
            </div>
        </>
    );
};

export default AccountInfo;
