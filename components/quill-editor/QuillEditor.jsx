import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Parser } from 'htmlparser2';

const QuillEditor = ({ name, label, value, onChange }) => {
  const [editorValue, setEditorValue] = useState(value);

  useEffect(() => {
    setEditorValue(value);
  }, [value]);

  const handleEditorChange = (content, delta, source, editor) => {
    const parsedText = content;

    if (parsedText !== editorValue) {
      // Check if the content is pasted
      if (
        source === 'user' &&
        delta &&
        delta.ops &&
        delta.ops.length === 1 &&
        delta.ops[0].insert
      ) {
        const clipboardData = editor.getContents();

        // Check if clipboard data contains HTML
        if (clipboardData && clipboardData.ops) {
          const html = editor.clipboard?.convert({ text: '' }).paste.content
            .innerHTML;
          editor.clipboard?.dangerouslyPasteHTML(html); // Paste the HTML content as formatted
          return;
        }
      }

      setEditorValue(parsedText);
      onChange(prevFormData => ({ ...prevFormData, [name]: parsedText }));
    }
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <div style={{ minHeight: '200px', maxHeight: '400px', overflow: 'auto' }}>
        <ReactQuill value={editorValue} onChange={handleEditorChange} />
      </div>
    </div>
  );
};

export default QuillEditor;
