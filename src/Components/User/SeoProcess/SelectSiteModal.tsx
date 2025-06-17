import React, { useEffect } from "react";

export interface Site {
  siteUrl: string;
  permissionLevel: string;
}

interface SelectSiteModalProps {
  isOpen: boolean;
  sites: Site[];
  onSelect: (site: Site) => void;
  selectedSite: Site | null;
  webListAllData: string | null;
}

const SelectSiteModal: React.FC<SelectSiteModalProps> = ({
  isOpen,
  sites,
  onSelect,
  selectedSite,
  webListAllData,
}) => {
 
  useEffect(() => {
    if (isOpen && webListAllData !== null) {
      const matchedSite = sites.find((site) => site.siteUrl === webListAllData);
      if (matchedSite) {
        onSelect(matchedSite);
      }
    }
  }, [isOpen, webListAllData, sites, onSelect]);
 

  return (
    <>
      {webListAllData === "" ||
        (webListAllData === null && (
          <div className="modal-container">
            <h2 className="modal-title">🔗 Select a Site</h2>

            <ul className="site-list">
              {sites.map((site, index) => (
                <li
                  key={index}
                  className={`site-item ${
                    selectedSite?.siteUrl === site.siteUrl ? "selected" : ""
                  }`}
                  onClick={() => {
                    if (webListAllData === "") {
                      onSelect(site);
                    }
                  }}
                >
                  {site.siteUrl}
                </li>
              ))}
            </ul>
          </div>
        ))}
    </>
  );
};

export default SelectSiteModal;
 
