import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, ExternalLink, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContentCardProps {
  id: string;
  name: string;
  category: string;
  postDate: string;
  slug: string;
  thumbnail?: string;
  isVip?: boolean;
  isBanned?: boolean;
  isUnknown?: boolean;
  isNew?: boolean;
  index?: number;
}

const ContentCard: React.FC<ContentCardProps> = ({
  name,
  category,
  postDate,
  slug,
  thumbnail,
  isVip = false,
  isBanned = false,
  isUnknown = false,
  isNew = false,
  index = 0
}) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const defaultThumbnail = "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=400";

  const getCardLink = () => {
    if (isBanned) return `/banned/${slug}`;
    if (isUnknown) return `/unknown/${slug}`;
    if (isVip) return `/vip/${slug}`;
    return `/free/${slug}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="dreamy-card group cursor-pointer"
    >
      <Link to={getCardLink()} className="block h-full">
        <div className="relative overflow-hidden">
          <img
            src={thumbnail || defaultThumbnail}
            alt={name}
            className="dreamy-card-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = defaultThumbnail;
            }}
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {isNew && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg animate-pulse"
              >
                NEW
              </motion.span>
            )}
            
            {isVip && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg"
              >
                <Crown className="w-3 h-3 mr-1" />
                VIP
              </motion.span>
            )}
            
            {isBanned && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
              >
                BANNED
              </motion.span>
            )}
            
            {isUnknown && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg"
              >
                UNKNOWN
              </motion.span>
            )}
          </div>
          
          {/* Hover overlay with external link icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400">
            <motion.div 
              className="bg-white/95 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-all duration-400 shadow-xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ExternalLink className="w-6 h-6 text-red-500" />
            </motion.div>
          </div>
        </div>
        
        <div className="dreamy-card-content">
          <h3 className="dreamy-card-title line-clamp-2 mb-3">
            {name}
          </h3>
          
          <div className="flex items-center justify-between">
            <span className="dreamy-card-category">
              {category}
            </span>
            
            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(postDate)}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ContentCard;