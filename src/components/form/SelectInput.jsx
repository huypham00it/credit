import React from 'react';
import { Form, Select } from 'antd';

const SelectInput = ({ initialValue = null, className = '', label = false, required = true, fieldStyle, ...props }) => {
    return (
        <Form.Item
            name={props.name}
            rules={[
                {
                    required: required,
                    message: props.required_message,
                },
            ]}
            className={className}
            label={label}
            initialValue={initialValue}
            style={fieldStyle}
        >
            <Select {...props} />
        </Form.Item>
    );
};

export default SelectInput;
