import React, { useEffect, useState } from "react";
import { AddDomainCrawlURL } from "../../SeoServices";
import { GetUserDetails } from "../../../Services/Services";
import CrawlingLoader from "../../../../Page/Loading/CrawlingLoader";

export interface Site {
  uuid: string;
  crawl_url: string;
}

interface AuditAllSiteModalProps {
  isOpen: boolean;
  onSelect: (site: Site) => void;
  AllData: any;
  AlreadySelectedCrawl: string | null;
  isLoading: boolean;
}

const AuditAllSiteModal: React.FC<AuditAllSiteModalProps> = ({
  isOpen,
  onSelect,
  AllData,
  AlreadySelectedCrawl,
  isLoading,
}) => {
  const [domainInput, setDomainInput] = useState<string>("");
  const [NewLoading, setNewLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [SelectedTimezone, setSelectedTimezone] = useState<any>();

  useEffect(() => {
    GetTimeZone();
  }, []);

  const GetTimeZone = async () => {
    try {
      const responseData = await GetUserDetails();
      if (responseData?.status === 200 || responseData?.status === 201) {
        if (responseData.data.timezone !== null) {
          setSelectedTimezone(responseData?.data?.timezone);
        }
      }
    } catch (error: any) {
      console.error("Error GetTimeZone:", error);
    }
  };

  useEffect(() => {
    if (isOpen && AlreadySelectedCrawl === "True") {
      const matched = AllData?.find(
        (site: any) => site.selected_site === "True"
      );
      if (matched) {
        const matchedSite = {
          uuid: matched.uuid,
          crawl_url: matched.crawl_url,
        };
        onSelect(matchedSite);
      }
    }
  }, [isOpen, onSelect, AlreadySelectedCrawl]);

  const sanitizeDomain = (value: string) => {
    return value.replace(/^https?:\/\//i, "").trim();
  };

  const handleSubmitDomain = async () => {
    setErrorMsg("");
    if (domainInput.trim() === "") {
      setErrorMsg("⚠️ Domain is required.");
      return;
    }

    setNewLoading(true);
    try {
      const formData = {
        domain: `https://${domainInput}`,
        timezone: SelectedTimezone,
      };
      const response = await AddDomainCrawlURL(formData);
      if (response.status === 201 || response.status === 200) {
        const domainSite = response.data;
        onSelect(domainSite);
      }
    } catch (error) {
      console.error("Error submitting domain:", error);
    } finally {
      setNewLoading(false);
    }
  };

  return (
    <>
      {(AlreadySelectedCrawl === "false" ||
        AlreadySelectedCrawl === null ||
        AlreadySelectedCrawl === undefined) &&
        !isLoading && (
          <>
            {NewLoading && <CrawlingLoader />}
            <div className="crawl-container">
              <div className="crawl-input-wrapper">
                <span className="crawl-prefix">https://</span>
                <input
                  type="text"
                  placeholder="Enter your domain"
                  value={domainInput}
                  onChange={(e) =>
                    setDomainInput(sanitizeDomain(e.target.value))
                  }
                  className="crawl-input"
                />
              </div>

              <button
                type="submit"
                onClick={handleSubmitDomain}
                className="crawl-btn"
                disabled={!domainInput.trim()}
              >
                Crawl
              </button>

              {errorMsg && <p className="crawl-error">{errorMsg}</p>}
            </div>
          </>
        )}
    </>
  );
};

export default AuditAllSiteModal;
