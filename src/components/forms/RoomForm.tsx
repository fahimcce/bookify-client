/* eslint-disable @typescript-eslint/no-explicit-any */


import { Form } from 'antd';
import { ReactNode } from 'react';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form'

type TSubmitHandler = {
    onSubmit: SubmitHandler<FieldValues>;
    children: ReactNode;
    defaultValue?: string | unknown | undefined;
    resolver?: any
}

type TFormConfig = {
    defaultValue?: Record<string, any | unknown>,
    resolver?: any
}

const RoomForm = ({ children, defaultValue, onSubmit, resolver }: TSubmitHandler) => {
    const formConfig: TFormConfig = {}
    if (defaultValue) {
        formConfig["defaultValue"] = defaultValue
    }
    if (resolver) {
        formConfig["resolver"] = resolver
    }
    const methods = useForm(formConfig)

    const submitForm: SubmitHandler<FieldValues> = (data) => {
        onSubmit(data)
        methods.reset();
    }
    return (
        <FormProvider {...methods}>
            <Form layout='vertical' onFinish={methods.handleSubmit(submitForm)}>
                {children}
            </Form>
        </FormProvider>
    )
}

export default RoomForm