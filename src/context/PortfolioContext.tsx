import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PersonalDetails,
  Experience,
  Project,
  ResearchPaper,
  BlogArticle,
  SkillCategory,
  PortfolioData,
} from '../types';
import {
  personalDetails as defaultPersonalDetails,
  experiences as defaultExperiences,
  projects as defaultProjects,
  researchPapers as defaultResearchPapers,
  blogArticles as defaultBlogArticles,
  skillCategories as defaultSkillCategories,
} from '../data/portfolioData';

const PORTFOLIO_STORAGE_KEY = 'ss_portfolio_cms_v2';

interface PortfolioContextType {
  data: PortfolioData;
  updatePersonalDetails: (details: PersonalDetails) => void;
  updateProfileImage: (image: string) => void;
  updateExperiences: (experiences: Experience[]) => void;
  updateProjects: (projects: Project[]) => void;
  updateResearchPapers: (papers: ResearchPaper[]) => void;
  updateBlogArticles: (articles: BlogArticle[]) => void;
  updateSkillCategories: (categories: SkillCategory[]) => void;
  saveAllData: (newData: PortfolioData) => void;
  resetToDefaults: () => void;
  importJsonData: (jsonString: string) => boolean;
  exportJsonData: () => void;
  isCmsOpen: boolean;
  setIsCmsOpen: (open: boolean) => void;
}

const getDefaultData = (): PortfolioData => ({
  personalDetails: defaultPersonalDetails,
  profileImage: localStorage.getItem('user_avatar') || '/AvatarSKB.png',
  experiences: defaultExperiences,
  projects: defaultProjects,
  researchPapers: defaultResearchPapers,
  blogArticles: defaultBlogArticles,
  skillCategories: defaultSkillCategories,
});

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...getDefaultData(),
          ...parsed,
          profileImage: parsed.profileImage || localStorage.getItem('user_avatar') || '/AvatarSKB.png',
        };
      }
    } catch (e) {
      console.error('Failed to load saved portfolio data from localStorage:', e);
    }
    return getDefaultData();
  });

  const [isCmsOpen, setIsCmsOpen] = useState(false);

  // Sync profileImage to legacy key for backwards compatibility
  useEffect(() => {
    if (data.profileImage) {
      localStorage.setItem('user_avatar', data.profileImage);
    }
  }, [data.profileImage]);

  const saveToLocalStorage = (newData: PortfolioData) => {
    try {
      localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(newData));
      if (newData.profileImage) {
        localStorage.setItem('user_avatar', newData.profileImage);
      }
    } catch (e) {
      console.error('Failed to save portfolio data to localStorage:', e);
    }
  };

  const updatePersonalDetails = (details: PersonalDetails) => {
    const updated = { ...data, personalDetails: details };
    setData(updated);
    saveToLocalStorage(updated);
  };

  const updateProfileImage = (image: string) => {
    const updated = { ...data, profileImage: image };
    setData(updated);
    saveToLocalStorage(updated);
  };

  const updateExperiences = (experiences: Experience[]) => {
    const updated = { ...data, experiences };
    setData(updated);
    saveToLocalStorage(updated);
  };

  const updateProjects = (projects: Project[]) => {
    const updated = { ...data, projects };
    setData(updated);
    saveToLocalStorage(updated);
  };

  const updateResearchPapers = (researchPapers: ResearchPaper[]) => {
    const updated = { ...data, researchPapers };
    setData(updated);
    saveToLocalStorage(updated);
  };

  const updateBlogArticles = (blogArticles: BlogArticle[]) => {
    const updated = { ...data, blogArticles };
    setData(updated);
    saveToLocalStorage(updated);
  };

  const updateSkillCategories = (skillCategories: SkillCategory[]) => {
    const updated = { ...data, skillCategories };
    setData(updated);
    saveToLocalStorage(updated);
  };

  const saveAllData = (newData: PortfolioData) => {
    setData(newData);
    saveToLocalStorage(newData);
  };

  const resetToDefaults = () => {
    const defaults = getDefaultData();
    defaults.profileImage = '/AvatarSKB.png';
    setData(defaults);
    localStorage.removeItem(PORTFOLIO_STORAGE_KEY);
    localStorage.setItem('user_avatar', '/AvatarSKB.png');
  };

  const importJsonData = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === 'object' && parsed.personalDetails) {
        saveAllData({
          ...getDefaultData(),
          ...parsed,
        });
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON import:', e);
    }
    return false;
  };

  const exportJsonData = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updatePersonalDetails,
        updateProfileImage,
        updateExperiences,
        updateProjects,
        updateResearchPapers,
        updateBlogArticles,
        updateSkillCategories,
        saveAllData,
        resetToDefaults,
        importJsonData,
        exportJsonData,
        isCmsOpen,
        setIsCmsOpen,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
