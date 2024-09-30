/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Select } from 'antd'
import { Controller } from 'react-hook-form';

type TSelectProps = {
    label: string;
    name: string;
    options: { value: string; label: string }[] | undefined;
    defaultValue?: any;
    disabled?: boolean;
    mode?: "multiple" | undefined;
    placeholder?: string;
    defaultOpen?: boolean;
    setSelectedSlot?: any;
}
const RoomSelect = ({ label, name, options, defaultValue, disabled, mode, placeholder, defaultOpen }: TSelectProps) => {
    return (
        <Controller name={name} render={({ field, fieldState: { error } }) => {
            return <Form.Item label={label}>
                <Select
                    autoFocus={defaultOpen && defaultOpen}
                    mode={mode}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    style={{ width: "100%" }}
                    {...field}
                    options={options}
                    size='large'
                    disabled={disabled}
                />
                {
                    error && <p style={{ color: "red", marginTop: "4px" }}>{error?.message}</p>
                }
            </Form.Item>
        }} />
    )
}

export default RoomSelect