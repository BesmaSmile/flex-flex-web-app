import React, { useState } from 'react';
import './style.scss';

function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(children[0].props.id);
  return (
    <div className="tabs">
      <ul className="nav nav-tabs">
        {children.map(({ props: { id, label } }) => (
          <li key={id} className="nav-item">
            <button className={`nav-link ${activeTab === id ? 'active' : ''}`} type="button" onClick={() => setActiveTab(id)}>{label}</button>
          </li>
        ))}
      </ul>
      {children.find(({ props: { id } }) => id === activeTab)}

    </div>
  );
}

export default Tabs;
