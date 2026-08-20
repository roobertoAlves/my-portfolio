import { useData } from "@/app/useData";

export default function Home() {
  const { profile, skills, projects } = useData();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <section id="about" className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          {profile.name}
        </h1>
        <p className="text-muted-foreground">{profile.headline.en}</p>
      </section>

      <section id="skills" className="mt-12 space-y-3">
        <h2 className="text-xl font-semibold">Skills</h2>
        <ul className="flex flex-wrap gap-2">
          {skills.map(skill => (
            <li
              key={skill.id}
              className="rounded-full border border-border bg-card px-3 py-1 text-xs"
            >
              {skill.name}
            </li>
          ))}
        </ul>
      </section>

      <section id="projects" className="mt-12 space-y-3">
        <h2 className="text-xl font-semibold">Projects</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {projects.map(project => (
            <li
              key={project.id}
              className="rounded-lg border border-border bg-card p-4"
            >
              <h3 className="font-medium">{project.title}</h3>
              <p className="text-sm text-muted-foreground">
                {project.summary.en}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
