import { Form, InputNumber } from "antd"
import { Controller } from "react-hook-form"

type TInputProps = {
    name: string;
    defaultValue?: string;
    type?: string;
    placeholder?: string;
    label?: string;
    className?: string
}

const RoomInputNumber = ({ name, defaultValue, label, placeholder, className }: TInputProps) => {
    return (
        <div className="mt-2">
            <Controller name={name} render={({ field, fieldState: { error } }) => {
                return <Form.Item label={label}>
                    <InputNumber min="1" {...field} id={name} defaultValue={defaultValue} size="large" placeholder={placeholder} className={className && className} />
                    {
                        error && <p className="text-[red] mt-1">{error?.message}</p>
                    }
                </Form.Item>
            }}
            />
        </div>
    )
}

export default RoomInputNumber