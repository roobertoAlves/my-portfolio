import { createContext } from "react";
import type { Education, Experience, Profile, Project, Skill } from "@/types/data";

export interface DataContextValue {
  profile: Profile;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
}

export const DataContext = createContext<DataContextValue | null>(null);
