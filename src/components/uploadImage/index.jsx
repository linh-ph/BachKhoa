import React, { useState } from "react";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  //useSelector,
  useDispatch,
} from "react-redux";
import { uploadImage, resetUploadResult } from "../../slices/blog";
const UploadImage = () => {
  const [defaultFileList, setDefaultFileList] = useState([]);
  const dispatch = useDispatch();
  //   const { uploadResult } = useSelector((state) => state.blog);

  const updateImage = (options) => {
    const { onSuccess, onError, file } = options;
    console.log(file.name);
    dispatch(uploadImage(file))
      .unwrap()
      .then(() => {
        message.success(`Upload image ${file.name} success!`);
        onSuccess("OK");
      })
      .catch((err) => {
        message.error("Cannot upload image...");
        onError({ err });
      });
  };

  const handleOnChange = ({ file, fileList, event }) => {
    setDefaultFileList(fileList);
  };

  const handleRemove = () => {
    dispatch(resetUploadResult());
  };

  const handleBeforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error(`${file.name} is not a png/jpeg file!`, 1.5);
    }

    return isJpgOrPng || Upload.LIST_IGNORE;
  };

  return (
    <Upload
      listType="picture"
      accept="image/*"
      beforeUpload={handleBeforeUpload}
      customRequest={updateImage}
      onChange={handleOnChange}
      defaultFileList={defaultFileList}
      onRemove={handleRemove}
    >
      {defaultFileList.length >= 1 ? null : (
        <Button icon={<UploadOutlined />}>Upload Image</Button>
      )}
    </Upload>
  );
};

export default UploadImage;
