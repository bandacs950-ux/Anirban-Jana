export interface PortfolioItem {
  id: string;
  title: string;
  category: 'weddings' | 'bridal' | 'couple' | 'events' | 'bw' | 'fashion' | 'cinematic';
  categoryLabel: string;
  image: string;
  location?: string;
  tags: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  priceEstimate?: string;
  iconName: string;
  features: string[];
  image: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
  iconName: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  date: string;
  avatar: string;
}

export interface AdvantageItem {
  title: string;
  description: string;
  iconName: string;
}
