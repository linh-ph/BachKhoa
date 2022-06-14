import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setPostContent } from "../../slices/blog";
import RichTextEditor from "react-rte";

const EditPostContentEditor = (props) => {
  const { content } = props;
  //   console.log(content);
  const dispatch = useDispatch();
  const [values, setValues] = useState(
    RichTextEditor.createValueFromString(content, "html")
  );

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

export default EditPostContentEditor;
