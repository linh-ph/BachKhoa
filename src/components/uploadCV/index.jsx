import React, { useState } from "react";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  //useSelector,
  useDispatch,
} from "react-redux";
import { uploadCV, resetUploadResult } from "../../slices/job";
const UploadCV = () => {
  const [defaultFileList, setDefaultFileList] = useState([]);
  const dispatch = useDispatch();
  //   const { uploadResult } = useSelector((state) => state.blog);

  const updateImage = (options) => {
    const { onSuccess, onError, file } = options;
    console.log(file.name);
    dispatch(uploadCV(file))
      .unwrap()
      .then(() => {
        message.success(`Upload file ${file.name} success!`);
        onSuccess("OK");
      })
      .catch((err) => {
        message.error("Cannot upload file...");
        onError({ err });
      });
  };

  const handleOnChange = ({ file, fileList, event }) => {
    setDefaultFileList(fileList);
  };

  const handleRemove = () => {
    dispatch(resetUploadResult());
  };

  return (
    <Upload
      listType="file"
      //   accept="image/*"
      customRequest={updateImage}
      onChange={handleOnChange}
      defaultFileList={defaultFileList}
      onRemove={handleRemove}
    >
      {defaultFileList.length >= 1 ? null : (
        <Button icon={<UploadOutlined />}>Upload Your CV</Button>
      )}
    </Upload>
  );
};

export default UploadCV;
