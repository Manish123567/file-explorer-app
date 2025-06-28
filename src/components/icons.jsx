import React from 'react';

export const FolderOpenIcon = () => <span role="img" aria-label="open-folder">📂</span>;
export const FolderClosedIcon = () => <span role="img" aria-label="closed-folder">📁</span>;
export const FileIcon = ({ name }) => {
  const ext = name.split('.').pop().toLowerCase();
  const icons = {
    pdf: '📕',
    txt: '📄',
    doc: '📘',
    jpg: '🖼️',
    png: '🖼️',
    js: '📟',
    json: '🗂️',
    default: '📃'
  };
  return <span role="img" aria-label="file">{icons[ext] || icons.default}</span>;
};