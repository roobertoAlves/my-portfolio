import educationRaw from "@/data/education.json";
import experienceRaw from "@/data/experience.json";
import profileRaw from "@/data/profile.json";
import projectsRaw from "@/data/projects.json";
import skillsRaw from "@/data/skills.json";
import type {
  Education,
  Experience,
  Profile,
  Project,
  Skill,
} from "@/types/data";
import { useMemo, type ReactNode } from "react";
import { DataContext, type DataContextValue } from "@/app/data-context";

interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
  const value = useMemo<DataContextValue>(
    () => ({
      profile: profileRaw as Profile,
      skills: skillsRaw as Skill[],
      experience: experienceRaw as Experience[],
      education: educationRaw as Education[],
      projects: projectsRaw as Project[],
    }),
    []
  );
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
