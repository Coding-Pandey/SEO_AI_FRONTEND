import React from 'react';
 

export interface Site {
  siteUrl: string;
  permissionLevel: string;
}

interface SelectSiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  sites: Site[];
  onSelect: (site: Site) => void;
  selectedSite: Site | null;
}

const SelectSiteModal: React.FC<SelectSiteModalProps> = ({
  isOpen,
  onClose,
  sites,
  onSelect,
  selectedSite,
}) => {
  if (!isOpen) return null;

  return (
 
      <div className="modal-container">
        <h2 className="modal-title">🔗 Select a Site</h2>

        <ul className="site-list">
          {sites.map((site, index) => (
            <li
              key={index}
              className={`site-item ${
                selectedSite?.siteUrl === site.siteUrl ? 'selected' : ''
              }`}
              onClick={() => onSelect(site)}
            >
              {site.siteUrl}
            </li>
          ))}
        </ul>
<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          className="modal-button"
          onClick={onClose}
          disabled={!selectedSite}
        >
          Continue
        </button>
        </div>
      </div>
   
  );
};

export default SelectSiteModal;
