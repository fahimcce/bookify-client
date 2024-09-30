/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button, Col, Flex, Form, Modal, TimePicker } from 'antd';
import RoomForm from '../../../components/forms/RoomForm';
import RoomSelect from '../../../components/forms/RoomSelelct';
import { toast } from 'sonner';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import RoomDatePicker from '../../../components/forms/RoomDatePicker';
import { TResponse } from '../../../types/ResponseType';
import { useCreateSlotsMutation } from '../../../redux/api/roomManagement/slot.api';
import { useGetAllRoomsQuery } from '../../../redux/api/roomManagement/room.api';

const CreateSlotModal: React.FC = () => {
    const [startTime, setStarttime] = useState("")
    const [endTime, setEndtime] = useState("")
    const [createSlote] = useCreateSlotsMutation()
    const { data, isLoading } = useGetAllRoomsQuery({})
    const allrooms = data?.data?.result;


    const roomsOptions: { label: string; value: string }[] = []
    allrooms?.forEach((item: { name: string, _id: string }) => {

        roomsOptions.push({
            value: item?._id,
            label: `${item?.name}`,
        })
    })


    // console.log(file)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const slotData = {
            ...data, endTime, startTime
        }
        const id = toast.loading("Creating....")


        const res = await createSlote(slotData) as TResponse<any>

        if (res.error) {
            toast.error(res?.error?.data?.message, { id })
        } else {
            toast.success(res?.data?.message, { id });
            setIsModalOpen(false);
        }
    }

    const handleChange: any = (_time: string, timeString: string) => {
        setStarttime(timeString[0])
        setEndtime(timeString[1])
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Create Slots
            </Button>
            <Modal title="Add New Rooms" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Flex justify="center">
                    <Col span={24}>
                        <RoomForm onSubmit={handleSubmit}>
                            <RoomSelect disabled={isLoading} options={roomsOptions} name="room" placeholder="Select Rooms" label="Select Rooms" />

                            <RoomDatePicker label='Select Date' name='date' />

                            <Form.Item label="Start Time and End Time" rules={[{ required: true, message: "Please Select Time" }]}>
                                <TimePicker.RangePicker format="HH:mm" className='w-full' onChange={handleChange} />
                            </Form.Item>

                            <Button htmlType="submit" className="md:px-7 mb-5">Submit</Button>

                        </RoomForm>

                    </Col>
                </Flex>
            </Modal>
        </>
    );
};

export default CreateSlotModal;