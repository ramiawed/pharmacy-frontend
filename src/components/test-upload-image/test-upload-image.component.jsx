import React, { useState } from "react";
import { BASEURL, SERVER_URL } from "../../utils/constants";
import axios from "axios";

function TestUploadImage() {
  const [selectedFile, setSelectedFile] = useState(null);

  // const handleChange = (event) => {
  //   this.setState({
  //     name: document.getElementById("name").value,
  //     price: document.getElementById("price").value,
  //   });
  // };

  const fileSelectedHandler = (event) => {
    let file = event.target.files[0].name;
    setSelectedFile(
      event.target.files[0]
      // filename: document.getElementById("file").value,
    );
    console.log(file);
  };

  const fileUploadHandler = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("file", selectedFile);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    axios.post(`${BASEURL}/upload`, formData, config).then((res) => {
      console.log(res.data);
      console.log(formData);
    });
  };

  return (
    <div>
      <form encType="multipart/form-data">
        <div>
          <input type="file" name="file" onChange={fileSelectedHandler} />

          <input
            type="submit"
            onClick={fileUploadHandler}
            value="Get me the stats!"
          />
        </div>
      </form>
    </div>
  );
}

export default TestUploadImage;
