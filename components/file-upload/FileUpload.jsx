import React from 'react';
import { Container, Row, Col, Form, Image } from 'react-bootstrap';
import galleryAdd from '../../assets/images/property-management/gallery-add.svg';
import './FileUpload.css';

const FileUpload = ({
  setFiles,
  files,
  FileUploadLength,
  isEditMode,
  image,
  type = 'singleImage',
}) => {
  const handleDrop = event => {
    event.preventDefault();
    const fileList = Array.from(event.dataTransfer.files);
    setFiles([...files, ...fileList]);
  };

  const handleFileInputChange = e => {
    const fileList = Array.from(e.target.files);
    if (type === 'singleImage') {
      setFiles(fileList);
    } else {
      setFiles([...files, ...fileList]);
    }
  };

  return (
    <Container fluid="lg" className="file-upload">
      <Row>
        <Col className="d-flex flex-wrap gap-3">
          {!files.length && isEditMode && (
            <ul className="list-unstyled w-100 grid-container">
              <li className="d-flex justify-content-center align-items-center">
                <Image src={image} alt="test" loading="lazy" fluid />
              </li>
            </ul>
          )}
          {!!files.length && (
            <ul className="list-unstyled w-100 grid-container">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="d-flex justify-content-center align-items-center"
                >
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    loading="lazy"
                    fluid
                  />
                </li>
              ))}
            </ul>
          )}
          {type === 'singleImage' ? (
            <Form
              className="position-relative"
              onDragOver={event => event.preventDefault()}
              onDrop={handleDrop}
            >
              <Form.Group controlId="formFileSingle">
                <label htmlFor="formFileSingle" className="drag-drop-text">
                  <Image
                    src={galleryAdd}
                    alt="upload"
                    className="mb-2 file-upload-img-icon"
                    fluid
                  />
                  <div className="d-flex align-items-center gap-1">
                    <span className="drag-drop-text-span text-center fw-bold">
                      Upload your photo
                    </span>
                  </div>
                  <Form.Control
                    type="file"
                    multiple={false}
                    onChange={handleFileInputChange}
                    style={{ display: 'none' }}
                  />
                </label>
              </Form.Group>
            </Form>
          ) : (
            <Form
              className="position-relative"
              onDragOver={event => event.preventDefault()}
              onDrop={handleDrop}
            >
              <Form.Group controlId="formFileMultiple">
                <label htmlFor="formFileMultiple" className="drag-drop-text">
                  <Image
                    src={galleryAdd}
                    alt="upload"
                    className="mb-2 file-upload-img-icon"
                    fluid
                  />
                  <div className="d-flex align-items-center gap-1">
                    <span className="drag-drop-text-span text-center fw-bold">
                      Upload your photos
                    </span>
                  </div>
                  <Form.Control
                    type="file"
                    multiple={true}
                    onChange={handleFileInputChange}
                    style={{ display: 'none' }}
                  />
                </label>
              </Form.Group>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default FileUpload;
