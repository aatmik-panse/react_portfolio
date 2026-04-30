export type Education = {
  school: string;
  degree: string;
  score: string;
  dates: string;
  location: string;
  awards?: string[];
};

export const education: Education[] = [
  {
    school: 'Scaler School Of Technology',
    degree: 'Computer Science',
    score: 'CGPA 8.75',
    dates: 'Jul 2023 — Aug 2027',
    location: 'Bengaluru, India',
    awards: ["Dean's List 2025"],
  },
  {
    school: 'Birla Institute Of Technology, Pilani',
    degree: 'Bachelor of Science in Computer Science',
    score: 'CGR 9.0',
    dates: 'Jul 2023 — Aug 2026',
    location: 'Pilani, India',
  },
];
