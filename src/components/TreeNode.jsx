// File: src/components/TreeNode.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFileSystem } from '../store/fileSystemSlice';
import { useDrag, useDrop } from 'react-dnd';
import { FolderOpenIcon, FolderClosedIcon, FileIcon } from './icons';

const TreeNode = ({ node, setSelectedFile, path, searchTerm, autoExpand }) => {
  const dispatch = useDispatch();
  const fs = useSelector((state) => state.fileSystem);
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(node.name);
  const [creatingType, setCreatingType] = useState(null);
  const [creatingName, setCreatingName] = useState('');

  const isFolder = node.type === 'folder';
  const matchesSearch = node.name.toLowerCase().includes(searchTerm);
  const shouldExpand = autoExpand && searchTerm && isFolder && node.children?.some(c => c.name.toLowerCase().includes(searchTerm));

  useEffect(() => {
    if (shouldExpand) setExpanded(true);
  }, [shouldExpand]);

  const [{}, drag, preview] = useDrag(() => ({
    type: 'NODE',
    item: { node, path }
  }));

  const [, drop] = useDrop(() => ({
    accept: 'NODE',
    drop: (dragged) => handleDrop(dragged.node, dragged.path)
  }));

  const clone = (obj) => JSON.parse(JSON.stringify(obj));
  const findNode = (fs, path) => path.reduce((cur, name) => cur.children.find(c => c.name === name), fs);

  const handleDrop = (draggedNode, draggedPath) => {
    if (JSON.stringify(path) === JSON.stringify(draggedPath)) return;
    const newFs = clone(fs);
    const fromParent = findNode(newFs, draggedPath.slice(0, -1));
    const toParent = findNode(newFs, path);
    const draggedIndex = fromParent.children.findIndex(c => c.name === draggedNode.name);
    const [draggedItem] = fromParent.children.splice(draggedIndex, 1);
    if (!toParent.children) toParent.children = [];
    toParent.children.push(draggedItem);
    dispatch(setFileSystem(newFs));
  };

  const handleRename = (name) => {
    const newFs = clone(fs);
    const parent = findNode(newFs, path.slice(0, -1));
    const item = path.length ? parent.children.find(c => c.name === path.at(-1)) : newFs;
    item.name = name;
    dispatch(setFileSystem(newFs));
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (!window.confirm(`Delete '${node.name}'?`)) return;
    const newFs = clone(fs);
    const parent = findNode(newFs, path.slice(0, -1));
    parent.children = parent.children.filter(c => c.name !== node.name);
    dispatch(setFileSystem(newFs));
  };

  const handleCreate = () => {
    if (!creatingName) return;
    const newFs = clone(fs);
    const parent = findNode(newFs, path);
    parent.children = parent.children || [];
    parent.children.push({ name: creatingName, type: creatingType, children: creatingType === 'folder' ? [] : undefined, content: '' });
    dispatch(setFileSystem(newFs));
    setCreatingName('');
    setCreatingType(null);
  };

  const highlightName = (name) =>
    searchTerm ? name.replace(new RegExp(`(${searchTerm})`, 'gi'), '<mark>$1</mark>') : name;

  if (!matchesSearch && searchTerm && !isFolder && !shouldExpand) return null;

  return (
    <div style={{ marginLeft: '15px' }} ref={(el) => drag(drop(el))}>
      <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
        <span onClick={() => isFolder ? setExpanded(!expanded) : setSelectedFile(node)} style={{ cursor: 'pointer' }}>
          {isFolder ? (expanded ? <FolderOpenIcon /> : <FolderClosedIcon />) : <FileIcon name={node.name} />}
        </span>
        {isEditing ? (
          <input
            value={newName}
            autoFocus
            onBlur={() => handleRename(newName)}
            onKeyDown={(e) => e.key === 'Enter' && handleRename(newName)}
            onChange={(e) => setNewName(e.target.value)}
          />
        ) : (
          <span
            onDoubleClick={() => setIsEditing(true)}
            dangerouslySetInnerHTML={{ __html: highlightName(node.name) }}
          />
        )}
        <button onClick={handleDelete}>🗑️</button>
      </div>

      {isFolder && expanded && (
        <div>
          {node.children?.map((child, index) => (
            <TreeNode
              key={index}
              node={child}
              setSelectedFile={setSelectedFile}
              path={[...path, node.name]}
              searchTerm={searchTerm}
              autoExpand={autoExpand}
            />
          ))}
          {creatingType && (
            <div style={{ marginLeft: '20px' }}>
              <input
                placeholder={`Enter ${creatingType} name`}
                value={creatingName}
                autoFocus
                onChange={(e) => setCreatingName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                onBlur={handleCreate}
              />
            </div>
          )}
          <div style={{ marginLeft: '20px', display: 'flex', gap: '5px' }}>
            <button onClick={() => setCreatingType('file')}>📄+</button>
            <button onClick={() => setCreatingType('folder')}>📁+</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreeNode;