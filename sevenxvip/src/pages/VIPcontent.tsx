import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Search, Calendar, LayoutGrid, SortDesc, ChevronDown, Crown, Sparkles, Filter, Star } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import ContentCard from "../components/ContentCard";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

type LinkItem = {
  id: string;
  name: string;
  category: string;
  postDate: string;
  slug: string;
  link: string;
  thumbnail?: string;
  linkP?: string;
  linkG?: string;
  linkMV1?: string;
  linkMV2?: string;
  linkMV3?: string;
  updatedAt?: string;
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

const VIPContent: React.FC = () => {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [filteredLinks, setFilteredLinks] = useState<LinkItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchName, setSearchName] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("mostRecent");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreContent, setHasMoreContent] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    document.title = "VIP Content - Sevenxleaks";
  }, []);

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

      const response = await axios.get<{ data: string }>(
        `${import.meta.env.VITE_BACKEND_URL}/vipcontent/search?${params}`,
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
      const { data, totalPages } = decoded as { data: LinkItem[]; totalPages: number };

      if (isLoadMore) {
        setLinks(prev => [...prev, ...data]);
        setFilteredLinks(prev => [...prev, ...data]);
      } else {
        setLinks(data);
        setFilteredLinks(data);
      }

      setTotalPages(totalPages);
      setHasMoreContent(page < totalPages);

      const uniqueCategories = Array.from(
        new Set(data.map((item: LinkItem) => item.category))
      ).map((category: string) => ({
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

  function decodeModifiedBase64(encodedStr: string): any {
    const fixedBase64 = encodedStr.slice(0, 2) + encodedStr.slice(3);
    const jsonString = atob(fixedBase64);
    return JSON.parse(jsonString);
  }

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

  return (
    <div className="dreamy-page">
      <Helmet>
        <title>VIP Content - Sevenxleaks</title>
        <link rel="canonical" href="https://sevenxleaks.com/vip" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* VIP Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-4 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Crown className="w-12 h-12 text-yellow-500" />
            </motion.div>
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700">
              VIP Content
            </h1>
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <Crown className="w-12 h-12 text-yellow-500" />
            </motion.div>
          </motion.div>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Exclusive premium content just for VIP members. Enjoy ad-free experience and early access to new releases.
          </motion.p>
          
          {/* VIP Benefits Banner */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="dreamy-section max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <motion.div 
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-gray-700">Ad-Free Experience</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-gray-700">Exclusive Content</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-gray-700">Early Access</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="dreamy-section mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Filter className="w-6 h-6 text-red-500" />
            Search & Filter VIP Content
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
                    isVip={true}
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
                        <span>Load More VIP Content</span>
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
                No VIP Content Found
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
};

export default VIPContent;