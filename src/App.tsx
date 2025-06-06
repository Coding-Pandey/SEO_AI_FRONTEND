import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loading from "./Components/Page/Loading/Loading";
import PageNotFound from "./Components/Page/PageNotFound";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import Logout from "./Components/Page/Logout";
 
 
 
const Login = lazy(() => import("./auth/Login"));
const DashBoard = lazy(() => import("./Components/User/DashBoard/DashBoard"));
const KeywordTool = lazy(() => import("./Components/User/SeoProcess/KeywordTool"));
const ContentGeneration = lazy(() => import("./Components/User/Content/ContentGeneration"));
const CreateCampaign = lazy(() => import("./Components/User/PPC/CreateCampaign"));
const GeneratePost = lazy(() => import("./Components/User/SocialMedia/GeneratePost"));
const GeneratedPostResult = lazy(() => import("./Components/User/SocialMedia/GeneratedPostResult")); 
const KeywordToolResult = lazy(() => import("./Components/User/SeoProcess/KeywordToolResult")); 
const KeywordsSuggestionsResult = lazy(() => import("./Components/User/SeoProcess/KeywordsSuggestionsResult")); 
const CreateCampaignKeywordResult = lazy(() => import("./Components/User/PPC/CreateCampaignKeywordResult")); 
const CreateCampaignSuggestionResult = lazy(() => import("./Components/User/PPC/CreateCampaignSuggestionResult")); 
const SuggestionsResultById = lazy(() => import("./Components/User/SeoProcess/SuggestionsResultById"));
const CampaignSuggestionById = lazy(() => import("./Components/User/PPC/CampaignSuggestionById")); 
const Planner = lazy(() => import("./Components/User/SocialMedia/Planner")); 
const ContentGenerationResult = lazy(() => import("./Components/User/Content/ContentGenerationResult")); 
const ContentSuggestionResult = lazy(() => import("./Components/User/Content/ContentSuggestionResult")); 
const ContentPreviousList = lazy(() => import("./Components/User/Content/ContentPreviousList")); 
const ProfileSetting = lazy(() => import("./Components/User/Pages/ProfileSetting")); 
const ProfileSettingSuccess = lazy(() => import("./Components/User/Pages/ProfileSettingSuccess")); 
const Reports = lazy(() => import("./Components/User/SeoProcess/Reports")); 

function App() {
  return (
    <>
      <ToastContainer />
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Login />} />
          <Route path="/Logout" element={<Logout />} />


          {/* Protected Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashBoard" element={<DashBoard />} />
            <Route path="/seo/keywordTool" element={<KeywordTool />} />
            <Route path="/seo/keywordToolResult" element={<KeywordToolResult />} />
            <Route path="/seo/KeywordsSuggestionsResult" element={<KeywordsSuggestionsResult />} />
            <Route path="/seo/SuggestionsResultById/:id" element={<SuggestionsResultById />} />
            <Route path="/seo/Reports" element={<Reports />} />

            <Route path="/ppc/CreateCampaign" element={<CreateCampaign />} />
            <Route path="/ppc/CreateCampaignKeywordResult" element={<CreateCampaignKeywordResult />} />
            <Route path="/ppc/CreateCampaignSuggestionResult" element={<CreateCampaignSuggestionResult />} />
            <Route path="/ppc/CampaignSuggestionById/:id" element={<CampaignSuggestionById />} />

            <Route path="/social/GeneratePost" element={<GeneratePost />} />
            <Route path="/social/GeneratedPostResult/:id" element={<GeneratedPostResult />} />
            <Route path="/social/Planner" element={<Planner />} />
            
            <Route path="/content/ContentGeneration" element={<ContentGeneration />} />
            <Route path="/content/ContentGenerationResult" element={<ContentGenerationResult />} />
            <Route path="/content/ContentSuggestionResult" element={<ContentSuggestionResult />} />
            <Route path="/content/ContentPreviousList/:id" element={<ContentPreviousList />} />
          
           <Route path="/ProfileSetting" element={<ProfileSetting />} />
           <Route path="/ProfileSettingSuccess/:category" element={<ProfileSettingSuccess />} />
          
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
