import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setDiscussContent } from "../../slices/discussion";
import RichTextEditor from "react-rte";

const DiscussContentEditor = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState(RichTextEditor.createEmptyValue());

  const onChange = (value) => {
    setValues(value);
    // console.log(values.toString("html"));
    dispatch(setDiscussContent(values.toString("html")));
  };

  return (
    <RichTextEditor
      value={values}
      onChange={onChange}
      placeholder="Write your contents here..."
    />
  );
};

export default DiscussContentEditor;
