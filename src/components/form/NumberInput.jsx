import React from 'react';
import { Form, InputNumber } from 'antd';

const NumberInput = ({ name, required = true, initialValue, required_message, ...props }) => {
    return (
        <Form.Item
            name={name}
            rules={[
                {
                    required: required,
                    message: required_message,
                },
            ]}
            initialValue={initialValue ? initialValue : ''}
        >
            <InputNumber autoComplete="off" style={{ width: '100%' }} {...props} />
        </Form.Item>
    );
};

export default NumberInput;
