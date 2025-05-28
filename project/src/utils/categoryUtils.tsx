import React from 'react';
import { Globe2, LandPlot, LineChart, Microscope, Newspaper, HeartPulse, Clapperboard, Trophy, DivideIcon as LucideIcon } from 'lucide-react';

export const getCategoryIcon = (category: string): LucideIcon => {
  const icons: Record<string, LucideIcon> = {
    world: Globe2,
    politics: LandPlot,
    business: LineChart,
    science: Microscope,
    general: Newspaper,
    health: HeartPulse,
    entertainment: Clapperboard,
    sports: Trophy,
  };
  
  return icons[category.toLowerCase()] || Newspaper;
};

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    world: 'bg-category-world',
    politics: 'bg-category-politics',
    technology: 'bg-category-technology',
    business: 'bg-category-business',
    sports: 'bg-category-sports',
    health: 'bg-category-health',
    entertainment: 'bg-category-entertainment',
    science: 'bg-category-science',
    general: 'bg-neutral-700',
  };
  
  return colors[category.toLowerCase()] || 'bg-neutral-700';
};