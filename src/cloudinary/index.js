import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

// Import any actions required for transformations.
import { fill } from "@cloudinary/url-gen/actions/resize";

const CloudInstance = () => {
  //create cloudinary instance and set cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dt0w6qc7c",
    },
  });

  const myImg = cld.image("samples/sheep");

  // Resize to 250 x 250 pixels using the 'fill' crop mode.
  myImg.resize(fill().width(250).height(250));

  return (
    <div>
      <AdvancedImage cldImg={myImg} />
    </div>
  );
};

export default CloudInstance;
