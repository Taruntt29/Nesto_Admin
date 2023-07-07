import React from 'react';
import './DocumentViewer.css';
const DocumentViewer = ({ documentUrl }) => {
  return (
    <div class="document-viewer">
      <iframe
        src={`https://docs.google.com/viewer?url=${documentUrl}&embedded=true`}
        frameborder="0"
        width="100%"
        height="100%"
      ></iframe>
    </div>
  );
};

export default DocumentViewer;
