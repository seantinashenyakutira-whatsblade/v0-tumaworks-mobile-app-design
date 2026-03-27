export const CATEGORIES = [
  { id: 'cleaning', label: 'Cleaning', icon: 'broom' },
  { id: 'repairs', label: 'Repairs & Maintenance', icon: 'tools' },
  { id: 'delivery', label: 'Delivery', icon: 'truck' },
  { id: 'home_services', label: 'Home Services', icon: 'home' },
  { id: 'transport', label: 'Transport & Moving', icon: 'car' },
  { id: 'personal', label: 'Personal Services', icon: 'user' },
  { id: 'business', label: 'Business & Digital', icon: 'laptop' },
  { id: 'education', label: 'Education & Training', icon: 'book' },
  { id: 'events', label: 'Events & Creative', icon: 'camera' },
  { id: 'seasonal', label: 'Seasonal Services', icon: 'sun' },
];

export const CATEGORY_TAGS: { [key: string]: string[] } = {
  cleaning: ['Laundry', 'Deep Cleaning', 'Carpet Cleaning', 'Window Cleaning', 'Office Cleaning', 'Pool Cleaning'],
  repairs: ['Plumbing', 'Electrical', 'Phone Repair', 'Appliance Fix', 'Car Repair', 'Carpentry', 'AC Repair'],
  delivery: ['Groceries', 'Food', 'Packages', 'Pharmacy', 'Documents'],
  home_services: ['Gardening', 'Painting', 'Interior Decor', 'Fumigation', 'Security Installation'],
  transport: ['Taxi', 'House Moving', 'Towing', 'Airport Pickup', 'Courier'],
  personal: ['Hairdressing', 'Barber', 'Makeup', 'Massage', 'Childcare', 'Personal Assistant'],
  business: ['Graphic Design', 'Web Dev', 'Data Entry', 'Accounting', 'Legal Advice'],
  education: ['Tutoring', 'Music Lessons', 'Language Classes', 'Driving Lessons'],
  events: ['Photography', 'Catering', 'DJ', 'Event Planning', 'Cake Baking'],
  seasonal: ['Holiday Decor', 'Seasonal Events', 'Gardening Maintenance'],
};
