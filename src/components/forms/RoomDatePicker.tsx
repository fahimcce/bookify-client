/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form"


type TDateProps = {
    label: string;
    name: string;
    defaultValue?: any;
    format?: string;
    disabledDate?: any
}

const RoomDatePicker = ({ name, label, defaultValue, format, disabledDate }: TDateProps) => {
    return (
        <Controller name={name} render={({ field, fieldState: { error } }) => {
            return <Form.Item label={label}>
                <DatePicker {...field} style={{ width: "100%" }} size='large' disabledDate={disabledDate && disabledDate} defaultValue={defaultValue && defaultValue} format={format && format} />
                {
                    error && <p style={{ color: "red", marginTop: "4px" }}>{error?.message}</p>
                }
            </Form.Item>
        }}

        />
    )
}

export default RoomDatePicker