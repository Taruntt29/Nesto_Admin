import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import "./FileUpload.css";

const FileUpload = () => {
  // const [files, setFiles] = useState([]);
  const [files, setFiles] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const fileList = Array.from(event.dataTransfer.files);
    setFiles([...files, ...fileList]);
  };

  // const handleFileInputChange = (event) => {
  //   const fileList = Array.from(event.target.files);
  //   setFiles([...files, ...fileList]);
  // };
  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    // const allowedTypes = ["image/jpeg", "image/png"];
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFiles(selectedFile);
    } else {
      // alert("Invalid file type. Please select a JPG or PNG file.");
      // alert(
      //   "Invalid file type. Please select a JPG, PNG, PDF, DOC, or DOCX file."
      // );
    }
  };

  return (
    <Container fluid="lg" className="profile-upload p-0">
      <Row>
        {/* <Col className="d-flex flex-wrap gap-3">
          {!!files.length > 0 && (
            <ul className="list-unstyled d-flex gap-3">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="d-flex justify-content-center align-items-center"
                >
                  <img src={`/assets/upload/${file.name}`} alt={file.name} />
                </li>
              ))}
            </ul>
          )} */}
        <Col className="d-flex flex-wrap gap-3">
          {files && (
            <div className="document-preview">
              {files.type.includes("image") ? (
                <img src={URL.createObjectURL(files)} alt={files.name} />
              ) : (
                <iframe src={URL.createObjectURL(files)} title={files.name} />
              )}
            </div>
          )}
          <Form
            className="position-relative"
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
          >
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Control
                type="file"
                // multiple
                // accept=".jpg,.jpeg,.png"
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                onChange={handleFileInputChange}
              />
              <div className="drag-drop-text">
                <img
                  src="/assets/upload-icon.svg"
                  alt="upload img"
                  className="img-fluid mb-2"
                />
                <div className="d-flex align-items-center gap-1">
                  <span className="drag-drop-text-span fw-bold">
                    Drag and drop files or
                  </span>{" "}
                  <span className="upload-link color-blue fw-bold">browse</span>
                </div>
                <p>Supported formats: JPEG, PNG</p>
              </div>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FileUpload;
