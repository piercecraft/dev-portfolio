export interface SkillItem {
  id: number;
  name: string;
  experience: number;
  notes: string;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}