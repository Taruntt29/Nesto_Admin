import React, { useState } from "react";

function UploadImg() {
  const [img, setImg] = useState("");

  function UploadImg(e) {
    console.log(e.target.files);
    setImg(e.target.files[0]);
  }
  return (
    <>
      <input type="file" name="file" onChange={UploadImg} />
      <button> Submit</button>
    </>
  );
}

export default UploadImg;
