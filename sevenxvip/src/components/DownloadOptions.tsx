import React from 'react';
import DownloadButton from './DownloadButton';
import { useRegion } from '../contexts/RegionContext';
import MEGA from '../assets/MEGA.png';
import Pixeldrain from '../assets/pixeldrain.png';
import Gofile from '../assets/Gofile.jpg';

interface DownloadOptionsProps {
  primaryLinks: {
    mega?: string;
    pixeldrain?: string;
    gofile?: string;
  };
  mirrorLinks: {
    mega?: string;
    pixeldrain?: string;
    gofile?: string;
  };
}

const DownloadOptions: React.FC<DownloadOptionsProps> = ({ primaryLinks, mirrorLinks }) => {
  const { region, getThemeColors } = useRegion();
  const colors = getThemeColors();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <DownloadButton
        url={primaryLinks.mega}
        fallbackUrl={mirrorLinks.mega}
        label="MEGA"
        icon={MEGA}
        bgColor={colors.primary}
        hoverColor={colors.primaryHover}
      />
      
      <DownloadButton
        url={primaryLinks.pixeldrain}
        fallbackUrl={mirrorLinks.pixeldrain}
        label="Pixeldrain"
        icon={Pixeldrain}
        bgColor={colors.primary}
        hoverColor={colors.primaryHover}
      />
      
      <DownloadButton
        url={primaryLinks.gofile}
        fallbackUrl={mirrorLinks.gofile}
        label="Gofile"
        icon={Gofile}
        bgColor={colors.primary}
        hoverColor={colors.primaryHover}
      />
    </div>
  );
};

export default DownloadOptions;