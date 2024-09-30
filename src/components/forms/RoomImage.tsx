/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Upload } from "antd";
// import { LuImagePlus } from "react-icons/lu";

const SelectSingleOrMultiImg = ({
    setFile,
    file,
    title,
    multiple,
    label,

}: {
    setFile: any;
    file: any;
    title: string;
    multiple?: boolean;
    label?: string
}) => {
    const onChangeWithCondition = (e: any) => {
        if (multiple && e.fileList?.length >= 1) {
            const orginalFilesArray = e.fileList.map((f: any) => f.originFileObj);
            setFile(orginalFilesArray);
            return;
        }
        if (!multiple && e.fileList.length >= 1) {
            setFile([e.fileList[0]?.originFileObj]);
            console.log([e.fileList[0]?.originFileObj])
            return;
        }
        setFile("");
    };
    const fileProps = {
        beforeUpload: () => false,
        onChange: onChangeWithCondition,
        listType: "picture",
        maxCount: multiple ? 100 : 1,
        type: "drag",
        multiple: multiple || false,

    };
    return (
        <Form.Item label={label ? label : null}>
            <Upload className="mb-5 flex items-center gap-5" {...(fileProps as any)} accept="image/*">
                <Button
                    style={{ background: "#3B82F6", color: "white" }}
                    className={`px-2 ${file?.length > 0 && "bg-green-600 text-white"} p-0 text-xl`}>
                    {/* <LuImagePlus /> */}
                    {file?.length >= 1
                        ? `${multiple ? "Add More" : "Replace"} : ${file?.length > 1 ? "Multiple Selected" : file[0]?.name}`
                        : title}
                </Button>
            </Upload>
        </Form.Item>
    );
};

export default SelectSingleOrMultiImg;
