export interface SEOGenerateKeywordDetails {
  keywords: string;
  description: string;
  language_id: {
    ID: number;
    Name: string;
  };
  location_ids: {
    id: number;
    country: string;
  }[];
}

interface SEOClusterKeywordData {
  keywords: any[];
  delete_word: {
    include: string[];
    exlude: string[];
  };
  language_id: {
    ID: number;
    Name: string;
  };
  location_ids: {
    id: number;
    country: string;
  }[];
}

export type SEOClusterKeywordDataPayload = SEOClusterKeywordData;

export interface SEOPPCClusterUploadPaylaod {
  fileName: string;
  data: SEOClusterPageData[];
}

export interface SEOClusterPageData {
  Page_title_id: string;
  Page_Title: string;
  Keywords: SEOClusterKeyword[];
  Intent: string;
  Suggested_URL_Structure: string;
}

export interface SEOClusterKeyword {
  Keyword_id: string;
  Keyword: string;
  Avg_Monthly_Searches: number;
}
