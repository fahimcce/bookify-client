import { Form, } from "antd"
import TextArea from "antd/es/input/TextArea";
import { Controller } from "react-hook-form"

type TInputProps = {
    name: string;
    defaultValue?: string;
    placeholder?: string;
    label?: string;
    className?: string
}

const RoomTextArea = ({ name, defaultValue, label, placeholder, className }: TInputProps) => {
    return (
        <div className="mt-2">
            <Controller name={name} render={({ field, fieldState: { error } }) => {
                return <Form.Item label={label}>
                    <TextArea size="large" {...field} defaultValue={defaultValue} placeholder={placeholder} className={className && className} />
                    {
                        error && <p className="text-[red] mt-1">{error?.message}</p>
                    }
                </Form.Item>
            }}
            />
        </div>
    )
}

export default RoomTextArea