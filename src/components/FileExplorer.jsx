// File: src/components/FileExplorer.js
import React from 'react';
import { useSelector } from 'react-redux';
import TreeNode from './TreeNode';

const FileExplorer = ({ setSelectedFile, searchTerm }) => {
  const fileSystem = useSelector((state) => state.fileSystem);
  return (
    <div>
      <h3>File Explorer</h3>
      <TreeNode
        node={fileSystem}
        setSelectedFile={setSelectedFile}
        path={[]}
        searchTerm={searchTerm.toLowerCase()}
        autoExpand={true}
      />
    </div>
  );
};

export default FileExplorer;