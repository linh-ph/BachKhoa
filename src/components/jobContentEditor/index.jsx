import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setNewJobContent } from "../../slices/job";
import RichTextEditor from "react-rte";

const JobContentEditor = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState(RichTextEditor.createEmptyValue());

  const onChange = (value) => {
    setValues(value);
    // console.log(values.toString("html"));
    dispatch(setNewJobContent(values.toString("html")));
  };

  return (
    <RichTextEditor
      value={values}
      onChange={onChange}
      placeholder="Write your contents here..."
    />
  );
};

export default JobContentEditor;
