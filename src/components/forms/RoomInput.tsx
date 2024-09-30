import { Form, Input } from "antd"
import { Controller } from "react-hook-form"

type TInputProps = {
    name: string;
    defaultValue?: string | undefined | number;
    type?: string;
    placeholder?: string;
    label?: string;
    className?: string
}

const RoomInput = ({ name, defaultValue, type, label, placeholder, className }: TInputProps) => {
    return (
        <div className="mt-1">
            <Controller name={name} render={({ field, fieldState: { error } }) => {
                return <Form.Item label={label}>
                    <Input {...field} defaultValue={defaultValue} placeholder={placeholder} type={type} size="large" className={className && className} />
                    {
                        error && <p className="text-[red] mt-1">{error?.message}</p>
                    }
                </Form.Item>
            }}
            />
        </div>
    )
}

export default RoomInput