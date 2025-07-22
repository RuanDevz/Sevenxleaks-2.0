import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Search, Calendar, LayoutGrid, SortDesc, X, Crown, Sparkles, ChevronDown, Grid3X3, Filter } from 'lucide-react';
import { useTheme } from "../contexts/ThemeContext";
import ContentCard from "../components/ContentCard";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";

type LinkItem = {
  id: string;
  name: string;
  category: string;
  postDate: string;
  slug: string;
  thumbnail?: string;
};

type Category = {
  id: string;
  name: string;
  category: string;
};

const months = [
  { value: "", label: "All Months" },
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const DreamyLoading = () => (
  <div className="dreamy-loading">
    <div className="dreamy-spinner"></div>
  </div>
);

function Freecontent() {
  const navigate = useNavigate();
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [filteredLinks, setFilteredLinks] = useState<LinkItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchName, setSearchName] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("mostRecent");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreContent, setHasMoreContent] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    document.title = "Sevenxleaks - Free Content";
  }, []);

  function decodeModifiedBase64(encodedStr: string): any {
    const fixedBase64 = encodedStr.slice(0, 2) + encodedStr.slice(3);
    const jsonString = atob(fixedBase64);
    return JSON.parse(jsonString);
  }

  const fetchContent = async (page: number, isLoadMore = false) => {
    try {
      if (!isLoadMore) setLoading(true);
      setSearchLoading(true);

      const params = new URLSearchParams({
        page: page.toString(),
        search: searchName,
        category: selectedCategory,
        month: selectedMonth,
        sortBy: 'postDate',
        sortOrder: sortOption === 'mostRecent' ? 'DESC' : 'ASC',
        limit: '24'
      });

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/freecontent/search?${params}`,
        {
          headers: {
            'x-api-key': `${import.meta.env.VITE_FRONTEND_API_KEY}`
          }
        }
      );

      if (!response.data || !response.data.data) {
        throw new Error('Invalid server response');
      }

      const decoded = decodeModifiedBase64(response.data.data);
      const { data: rawData, totalPages } = decoded as { data: LinkItem[], totalPages: number };

      if (isLoadMore) {
        setLinks(prev => [...prev, ...rawData]);
        setFilteredLinks(prev => [...prev, ...rawData]);
      } else {
        setLinks(rawData);
        setFilteredLinks(rawData);
      }

      setTotalPages(totalPages);
      setHasMoreContent(page < totalPages);

      const uniqueCategories = Array.from(
        new Set(rawData.map((item: LinkItem) => item.category))
      ).map((category: string): Category => ({
        id: category,
        name: category,
        category: category,
      }));

      setCategories(prev => {
        const existingCategories = new Set(prev.map(c => c.category));
        const newCategories = uniqueCategories.filter(c => !existingCategories.has(c.category));
        return [...prev, ...newCategories];
      });

    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      fetchContent(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchName, selectedMonth, selectedCategory, sortOption]);

  const handleLoadMore = () => {
    if (loadingMore || currentPage >= totalPages) return;
    
    setLoadingMore(true);
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchContent(nextPage, true);
  };

  const recentLinks = filteredLinks.slice(0, 5);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleBecomeVIP = () => {
    navigate("/plans");
  };

  return (
    <div className="dreamy-page">
      <Helmet>
        <title>Sevenxleaks - Free Content</title>
        <link rel="canonical" href="https://sevenxleaks.com/" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-6xl font-black text-gray-900 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Free Content
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover amazing free content from our community. Upgrade to VIP for an ad-free experience and exclusive content.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8"
          >
            <button 
              onClick={() => setShowPopup(true)}
              className="dreamy-button text-lg px-8 py-4"
            >
              <Sparkles className="w-5 h-5 mr-2 inline" />
              Upgrade to VIP
            </button>
          </motion.div>
        </motion.div>

        {/* VIP Popup */}
        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
                className="dreamy-form max-w-md w-full mx-4"
              >
                <button
                  onClick={handleClosePopup}
                  className="absolute -right-2 -top-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                
                <div className="text-center">
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Crown className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <h2 className="dreamy-form-title">
                    Unlock Premium Experience
                  </h2>
                  <p className="dreamy-form-subtitle">
                    Upgrade to VIP for an ad-free experience and exclusive content.
                  </p>
                  
                  <div className="space-y-4">
                    <button
                      onClick={handleBecomeVIP}
                      className="dreamy-button w-full py-4 text-lg"
                    >
                      <Sparkles className="w-5 h-5 mr-2 inline" />
                      Become VIP Now
                    </button>
                    <button
                      onClick={handleClosePopup}
                      className="w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      Continue with Ads
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search and Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="dreamy-section mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Filter className="w-6 h-6 text-red-500" />
            Search & Filter
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-red-500 transition-colors" />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="dreamy-input w-full pl-12 pr-4 text-gray-900 placeholder-gray-500"
              />
              {searchLoading && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            <div className="relative group">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-red-500 transition-colors" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="dreamy-input w-full pl-12 pr-4 appearance-none cursor-pointer text-gray-900"
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative group">
              <LayoutGrid className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-red-500 transition-colors" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="dreamy-input w-full pl-12 pr-4 appearance-none cursor-pointer text-gray-900"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.category}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative group">
              <SortDesc className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-red-500 transition-colors" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="dreamy-input w-full pl-12 pr-4 appearance-none cursor-pointer text-gray-900"
              >
                <option value="mostRecent">Most Recent</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="space-y-12">
          {loading ? (
            <DreamyLoading />
          ) : filteredLinks.length > 0 ? (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="dreamy-grid"
              >
                {filteredLinks.map((link: LinkItem, index: number) => (
                  <ContentCard
                    key={link.id}
                    id={link.id}
                    name={link.name}
                    category={link.category}
                    postDate={link.postDate}
                    slug={link.slug}
                    thumbnail={link.thumbnail}
                    isNew={recentLinks.includes(link)}
                    index={index}
                  />
                ))}
              </motion.div>
              
              {hasMoreContent && (
                <div className="flex justify-center mt-12">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className={`dreamy-button px-8 py-4 text-lg flex items-center gap-3 ${
                      loadingMore ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {loadingMore ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Loading...</span>
                      </>
                    ) : (
                      <>
                        <span>Load More Content</span>
                        <ChevronDown className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </div>
              )}
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="dreamy-section text-center py-16"
            >
              <div className="text-gray-400 mb-6">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                No Content Found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Freecontent;