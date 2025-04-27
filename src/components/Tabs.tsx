import React, { useState } from 'react';


export function Tab({ id, label, children }: { id: string, label: string, children: React.ReactNode }) {
  return (
    <div id={id}>
      {children}
    </div>
  );
}
function Tabs({ children }: { children: React.JSX.Element[] }) {
  const [activeTab, setActiveTab] = useState(children[0].props.id);
  return (
    <div className="tabs">
      <ul className="flex border-b border-gray-300">
        {children.map(({ props: { id, label } }) => (
          <li key={id} className="border-none outline-none">
            <button
              type="button"
              onClick={() => setActiveTab(id)}
              className={`px-4 py-2 text-gray-700 border-none outline-none ${activeTab === id ? 'text-red-600 font-medium border-b-2 border-red-600' : ''
                }`}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
      {children.find(({ props: { id } }) => id === activeTab)}
    </div>
  );
}

export default Tabs;