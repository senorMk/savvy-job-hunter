import './Layout.css';
import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <header className="App-header">
          <h1>Header</h1>
      </header>
      <div className="Layout-body">
          <main>{children}</main>
      </div>
      <footer className="App-footer">
          <h1>Footer</h1>
      </footer>
    </>
  );
};

export default Layout;