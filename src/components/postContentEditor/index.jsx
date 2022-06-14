import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setPostContent } from "../../slices/blog";
import RichTextEditor from "react-rte";

const PostContentEditor = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState(RichTextEditor.createEmptyValue());

  const onChange = (value) => {
    setValues(value);
    // console.log(values.toString("html"));
    dispatch(setPostContent(values.toString("html")));
  };

  return (
    <RichTextEditor
      value={values}
      onChange={onChange}
      placeholder="Write your contents here..."
    />
  );
};

export default PostContentEditor;
