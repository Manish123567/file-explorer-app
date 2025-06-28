import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import FileExplorer from './components/FileExplorer';
import FileViewer from './components/FileViewer';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Provider store={store}>
      <div className="app">
        <aside className="sidebar">
          <input
            type="text"
            placeholder="🔍 Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
          <FileExplorer
            setSelectedFile={setSelectedFile}
            searchTerm={searchTerm}
          />
        </aside>
        <main className="viewer">
          <FileViewer file={selectedFile} />
        </main>
      </div>
    </Provider>
  );
}

export default App;
