import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import galleryAdd from '../../assets/images/property-management/gallery-add.svg';
import { RiCloseFill } from 'react-icons/ri';
import './CustomFileUpload.css';

const CustomFileUpload = ({
  multiple,
  selectedFiles,
  setSelectedFiles,
  placeholder,
}) => {
  const handleFileChange = e => {
    const files = Array.from(e.target.files);
    if (multiple) {
      setSelectedFiles(prevSelectedFiles => [...prevSelectedFiles, ...files]);
    } else {
      setSelectedFiles(files);
    }
  };

  const handleRemoveFile = file => {
    const updatedFiles = selectedFiles.filter(
      selectedFile => selectedFile.name !== file.name
    );
    setSelectedFiles(updatedFiles);
  };

  const renderFilePreview = file => {
    if (file.type.startsWith('image/')) {
      return (
        <Image
          fluid
          src={file instanceof File ? URL.createObjectURL(file) : file}
          alt={file.name}
          className="w-100 h-100"
          loading="lazy"
        />
      );
    } else {
      return (
        <div className="document-preview">
          <p>{file.name}</p>
        </div>
      );
    }
  };

  return (
    <div className="file-upload-container">
      <label className="file-input-label">
        <Image
          src={galleryAdd}
          alt="upload"
          className="mb-2 file-upload-img-icon"
          fluid
        />
        <div className="d-flex align-items-center gap-1">
          <span className="file-upload-text text-center fw-bold">
            {placeholder && placeholder}
          </span>
        </div>
        <input
          type="file"
          className="file-input"
          multiple={multiple}
          onChange={handleFileChange}
        />
      </label>
      {selectedFiles.length > 0 && (
        <ul className="file-list">
          {selectedFiles.map((file, index) => (
            <li className="file-list-item position-relative" key={index}>
              {renderFilePreview(file)}
              <button
                className="remove-button p-0 position-absolute end-0 top-0 me-2 mt-2 bg-danger rounded rounded-circle p-1"
                onClick={() => handleRemoveFile(file)}
              >
                <RiCloseFill color="#fff" size={30} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomFileUpload;
