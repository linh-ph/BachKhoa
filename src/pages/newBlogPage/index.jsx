import React from "react";
import AddNewBlogForm from "../../components/newBlogForm";
import "./style.scss";

const NewBlogPage = () => {
  return (
    <div className="new-blog-page">
      {/* <p>Add New Blog</p> */}
      <AddNewBlogForm />
    </div>
  );
};

export default NewBlogPage;
