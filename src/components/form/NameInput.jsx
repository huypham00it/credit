import React from 'react';
import { Form, Input } from 'antd';

import validName from '@/utils/validName';

const NameInput = ({
    required = true,
    label = false,
    className,
    name,
    initialValue,
    requiredMsg,
    ruleMsg,
    ...props
}) => {
    return (
        <Form.Item
            name={name}
            label={label}
            className={className}
            rules={[
                {
                    required: required,
                    message: requiredMsg || 'Vui lòng nhập đúng tên!',
                },
                () => ({
                    validator(_, value) {
                        if (!value || validName(value)) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error(ruleMsg || 'Vui lòng nhập đúng tên!'));
                    },
                }),
            ]}
            initialValue={initialValue ? initialValue : ''}
        >
            <Input autoComplete="off" maxLength={50} {...props} />
        </Form.Item>
    );
};

export default NameInput;
