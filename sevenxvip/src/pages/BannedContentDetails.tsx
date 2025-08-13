import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useRegion } from "../contexts/RegionContext";
import { Calendar, Tag, ArrowLeft, Shield, AlertTriangle } from "lucide-react";
import Loading from "../components/Loading/Loading";
import DownloadOptions from "../components/DownloadOptions";
import { Helmet } from "react-helmet";

type ContentItem = {
  id: number;
  name: string;
  link: string;
  linkP: string;
  linkG: string;
  linkMV1: string;
  linkMV2: string;
  linkMV3: string;
  category: string;
  postDate: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
};

const BannedContentDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();
  const { region, getThemeColors } = useRegion();
  const colors = getThemeColors();

  useEffect(() => {
    // Mock content fetch - replace with actual API call
    const fetchContentDetails = async () => {
      setLoading(true);
      setTimeout(() => {
        const mockContent: ContentItem = {
          id: 1,
          name: "Banned Content Example",
          link: "https://example.com/banned",
          linkP: "https://example.com/banned-p",
          linkG: "https://example.com/banned-g",
          linkMV1: "https://example.com/banned-mv1",
          linkMV2: "https://example.com/banned-mv2",
          linkMV3: "https://example.com/banned-mv3",
          category: "Banned",
          postDate: "2024-01-15",
          createdAt: "2024-01-15",
          updatedAt: "2024-01-15",
          slug: slug || ""
        };
        setContent(mockContent);
        setLoading(false);
      }, 1000);
    };

    if (slug) fetchContentDetails();
  }, [slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className={`max-w-md p-8 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{error}</p>
          <Link 
            to="/banned" 
            className={`mt-6 flex items-center gap-2 text-sm font-medium ${theme === 'dark' ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-500'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to banned content
          </Link>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className={`max-w-md p-8 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
          <h2 className="text-2xl font-bold mb-4">Content Not Found</h2>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
            The content you're looking for doesn't exist or has been removed.
          </p>
          <Link 
            to="/banned" 
            className={`mt-6 flex items-center gap-2 text-sm font-medium ${theme === 'dark' ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-500'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to banned content
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'}`}>
      <Helmet>
        <title>Sevenxleaks - {content.name}</title>
        <link rel="canonical" href={`https://sevenxleaks.com/banned/${content.slug}`} />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <Link 
          to="/banned" 
          className={`inline-flex items-center gap-2 mb-6 text-sm font-medium transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to banned content
        </Link>

        <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-3xl shadow-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl`}>
          <div className={`${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-purple-900/30 to-red-900/30' 
              : 'bg-gradient-to-r from-purple-50 to-red-50'
          } px-4 sm:px-8 py-4 sm:py-6 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-6 h-6 text-red-500" />
              <AlertTriangle className="w-6 h-6 text-purple-500" />
            </div>
            <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {content.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3 sm:mt-4">
              <div className="flex items-center gap-2">
                <Calendar className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {formatDate(content.postDate)}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Tag className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`inline-flex px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                  theme === 'dark' 
                    ? 'bg-red-500/20 text-red-300'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {content.category}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
              theme === 'dark' ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-amber-50 border border-amber-100'
            }`}>
              <AlertTriangle className={theme === 'dark' ? "text-amber-400" : "text-amber-600"} size={20} />
              <div>
                <p className={`font-medium ${theme === 'dark' ? "text-amber-400" : "text-amber-600"}`}>
                  Warning: Banned Content
                </p>
                <p className={`text-sm mt-1 ${theme === 'dark' ? "text-gray-300" : "text-gray-600"}`}>
                  This content has been restricted due to policy violations. Access may be limited.
                </p>
              </div>
            </div>

            <h2 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
              Download Options
            </h2>
            
            <DownloadOptions
              primaryLinks={{
                mega: content.link,
                pixeldrain: content.linkP,
                gofile: content.linkG
              }}
              mirrorLinks={{
                mega: content.linkMV1,
                pixeldrain: content.linkMV2,
                gofile: content.linkMV3
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannedContentDetails;