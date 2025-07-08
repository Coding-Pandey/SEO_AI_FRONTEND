import React, { useEffect } from "react";

export interface Site {
  uuid: string;
  crawl_url: string;
}

interface AuditAllSiteModalProps {
  isOpen: boolean;
  AllCrawlList: Site[];
  onSelect: (site: Site) => void;
  selectedSite: Site | null;
  AlreadySelectedCrawl: string | null;
  isLoading: boolean;
}

const AuditAllSiteModal: React.FC<AuditAllSiteModalProps> = ({
  isOpen,
  AllCrawlList,
  onSelect,
  selectedSite,
  AlreadySelectedCrawl,
  isLoading
}) => {

  useEffect(() => {
    if (isOpen && (AlreadySelectedCrawl !== null)) {
      const matchedSite = AllCrawlList.find((site) => site.crawl_url === AlreadySelectedCrawl);
      if (matchedSite) {
        onSelect(matchedSite);
      }
    }
  }, [isOpen, AlreadySelectedCrawl, AllCrawlList, onSelect]);

 

  return (
    <>
      {((AlreadySelectedCrawl === "" || AlreadySelectedCrawl === null || AlreadySelectedCrawl === undefined) && !isLoading ) && (
        <div className="modal-container">
          <h2 className="modal-title">🔗 Select a Site</h2>

          <ul className="site-list">
            {AllCrawlList.map((site, index) => (
              <li
                key={index}
                className={`site-item ${
                  selectedSite?.crawl_url === site.crawl_url ? "selected" : ""
                }`}
                onClick={() => {
                  if (AlreadySelectedCrawl === "" || AlreadySelectedCrawl === null || AlreadySelectedCrawl === undefined) {
                    onSelect(site);
                  }
                }}
              >
                {site.crawl_url}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default AuditAllSiteModal;
