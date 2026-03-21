export type ServiceCategory =
  | 'All Services'
  | 'Home Services'
  | 'Food & Delivery'
  | 'Repairs & Maintenance'
  | 'Personal Services'
  | 'Events & Creative'
  | 'Transport & Moving'
  | 'Business & Digital'
  | 'Education & Training'
  | 'Seasonal & Occasional';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  subcategory: string;
  icon: string; // Emoji
  shortDescription: string;
  tags: string[];
  price?: string;
  rating?: number;
  reviews?: number;
}

const CATEGORIES: { [key in ServiceCategory]?: { subs: string[], icons: string[] } } = {
  'Home Services': { subs: ['Cleaning', 'Laundry', 'Cooking', 'House Help', 'Gardening'], icons: ['🧹', '🧺', '🍳', '🏠', '🌱'] },
  'Food & Delivery': { subs: ['Grocery Delivery', 'Food Delivery', 'Errands', 'Catering'], icons: ['🛒', '🍔', '🏃', '🍱'] },
  'Repairs & Maintenance': { subs: ['Plumber', 'Electrician', 'Mechanic', 'Gadget Repair', 'Appliance Repair'], icons: ['🔧', '⚡', '🚗', '📱', '🧊'] },
  'Personal Services': { subs: ['Babysitting', 'Personal Training', 'Barber', 'Massage', 'Stylist'], icons: ['👶', '🏋️', '💈', '💆', '✂️'] },
  'Events & Creative': { subs: ['Photography', 'Event Planning', 'DJ Services', 'Decoration', 'Makeup Artist'], icons: ['📸', '🎉', '🎧', '🎈', '💄'] },
  'Transport & Moving': { subs: ['Ride Hailing', 'Moving Services', 'Driver for Hire', 'Cargo Transport'], icons: ['🚕', '📦', '🚙', '🚚'] },
  'Business & Digital': { subs: ['IT Support', 'Graphic Design', 'Web Development', 'Virtual Assistant'], icons: ['💻', '🎨', '🌐', '👩‍💻'] },
  'Education & Training': { subs: ['Tutoring', 'Language Lessons', 'Music Lessons', 'School Prep'], icons: ['📚', '🗣️', '🎸', '🎒'] },
  'Seasonal & Occasional': { subs: ['Farming Help', 'Holiday Decoration', 'Construction Work', 'Snow Removal'], icons: ['🚜', '🎄', '🏗️', '❄️'] },
};

function generateServices(count: number): ServiceItem[] {
  const items: ServiceItem[] = [];
  const categoriesList = Object.keys(CATEGORIES) as ServiceCategory[];
  
  for (let i = 0; i < count; i++) {
    const categoryName = categoriesList[i % categoriesList.length];
    const categoryData = CATEGORIES[categoryName]!;
    const subIndex = i % categoryData.subs.length;
    
    items.push({
      id: `srv_${i}`,
      name: `${categoryData.subs[subIndex]} Service ${i + 1}`,
      category: categoryName,
      subcategory: categoryData.subs[subIndex],
      icon: categoryData.icons[subIndex] || '🔖',
      shortDescription: `Professional ${categoryData.subs[subIndex].toLowerCase()} service provided by expert workers. Reliable and fast.`,
      tags: [categoryData.subs[subIndex].toLowerCase(), categoryName.toLowerCase(), 'fast', 'reliable'],
      rating: parseFloat((Math.random() * 2 + 3).toFixed(1)), // 3.0 to 5.0
      reviews: Math.floor(Math.random() * 500),
      price: `ZMW ${Math.floor(Math.random() * 900 + 100)}` 
    });
  }
  return items;
}

// Generate exactly 10,000 services optimally
export const mockServices: ServiceItem[] = generateServices(10000);
