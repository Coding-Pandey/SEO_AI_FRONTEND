export interface SEOGenerateKeywordDetails {
    keywords: string;          
    description: string;     
    language_id: number;   
    location_ids: number[];  
  }
  

   interface SEOClusterKeywordData {
    Keyword: string;
    Avg_Monthly_Searches: number;
  }
  
  export type SEOClusterKeywordDataPayload = SEOClusterKeywordData[];


  export interface SEOPPCClusterKeywordData {
      Keyword: string,
      Avg_Monthly_Searches: number,
      Competition: string,
      LowTopOfPageBid: number,
      HighTopOfPageBid: number,
  }

  
  export type SEOPPCClusterKeywordDataPayload = SEOPPCClusterKeywordData[];


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
  

 
  