import React from 'react';
import { Form, Input } from 'antd';

import { phoneValid } from '@/utils/phone';

const PhoneNumberInput = ({
    initialValue = '',
    required = true,
    requiredMsg,
    ruleMsg,
    existsMsg,
    exists = [],
    ...props
}) => {
    return (
        <Form.Item
            name={props.name}
            rules={[
                {
                    required: required,
                    message: requiredMsg || 'Vui lòng nhập đúng số điện thoại!',
                },
                () => ({
                    validator(_, value) {
                        if (!value || phoneValid(value)) {
                            if (exists.length > 0 && exists.includes(value)) {
                                return Promise.reject(new Error(existsMsg || 'Số điện thoại đã tồn tại!'));
                            }
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error(ruleMsg || 'Vui lòng nhập đúng số điện thoại!'));
                    },
                }),
            ]}
            initialValue={initialValue}
        >
            <Input autoComplete="off" type="number" {...props} />
        </Form.Item>
    );
};

export default PhoneNumberInput;
