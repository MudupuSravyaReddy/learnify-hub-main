export interface Course {
  id: string;
  title: string;
  category: string;
  instructor: string;
  rating: number;
  students: number;
  price: number;
  image: string;
  description: string;
  duration: string;
  level: string;
}

export const courses: Course[] = [
  { id: "1", title: "Complete Web Development Bootcamp", category: "Development", instructor: "Dr. Sarah Chen", rating: 4.8, students: 12450, price: 49.99, image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop", description: "Master HTML, CSS, JavaScript, React and Node.js from scratch.", duration: "42 hours", level: "Beginner" },
  { id: "2", title: "Data Science & Machine Learning", category: "Data Science", instructor: "Prof. James Wilson", rating: 4.9, students: 8920, price: 59.99, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop", description: "Learn Python, Pandas, Scikit-learn and TensorFlow.", duration: "56 hours", level: "Intermediate" },
  { id: "3", title: "UI/UX Design Masterclass", category: "Design", instructor: "Maria Rodriguez", rating: 4.7, students: 6340, price: 39.99, image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop", description: "Design beautiful interfaces with Figma and design thinking.", duration: "28 hours", level: "Beginner" },
  { id: "4", title: "Cloud Computing with AWS", category: "Cloud", instructor: "Alex Thompson", rating: 4.6, students: 5120, price: 69.99, image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop", description: "Become an AWS certified solutions architect.", duration: "38 hours", level: "Advanced" },
  { id: "5", title: "Mobile App Development with Flutter", category: "Development", instructor: "Kim Park", rating: 4.8, students: 7680, price: 44.99, image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop", description: "Build cross-platform mobile apps with Dart and Flutter.", duration: "34 hours", level: "Intermediate" },
  { id: "6", title: "Digital Marketing Strategy", category: "Marketing", instructor: "Lisa Brown", rating: 4.5, students: 9870, price: 34.99, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop", description: "Master SEO, social media, and content marketing.", duration: "22 hours", level: "Beginner" },
  { id: "7", title: "Cybersecurity Fundamentals", category: "Security", instructor: "Dr. Mark Evans", rating: 4.7, students: 4530, price: 54.99, image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop", description: "Learn ethical hacking, network security and threat analysis.", duration: "40 hours", level: "Intermediate" },
  { id: "8", title: "Blockchain & Web3 Development", category: "Development", instructor: "Nina Patel", rating: 4.4, students: 3210, price: 64.99, image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop", description: "Build decentralized applications with Solidity and Ethereum.", duration: "30 hours", level: "Advanced" },
];
