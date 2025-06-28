import React from 'react';

const FileViewer = ({ file }) => {
  return (
    <div style={styles.viewer}>
      <h3>File Viewer</h3>
      {file ? (
        <div>
          <strong>{file.name}</strong>
          <pre style={styles.content}>{file.content}</pre>
        </div>
      ) : (
        <p>Select a file to view its content</p>
      )}
    </div>
  );
};

const styles = {
  viewer: {
    width: '70%',
    padding: '10px',
    overflowY: 'auto',
    whiteSpace: 'pre-wrap',
    height: '100vh'
  },
  content: {
    whiteSpace: 'pre-wrap'
  }
};

export default FileViewer;
