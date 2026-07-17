import type { CVData } from "@/types/cv";
import { IndustryIcon } from "./CVParts";
import trailheadBanner from "@/assets/cv/trailhead-banner.png";
import ourMission from "@/assets/cv/our-mission.png";

interface CVWebExperienceProps {
  data: CVData;
}

function CertShield() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0" aria-hidden>
      <defs>
        <linearGradient id="cert-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3d7fab" />
          <stop offset="50%" stopColor="#4da68b" />
          <stop offset="100%" stopColor="#51ac52" />
        </linearGradient>
      </defs>
      <path
        fill="url(#cert-grad)"
        d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1 14.5l-3.5-3.5 1.41-1.41L11 13.67l4.59-4.58L17 10.5 11 16.5z"
      />
    </svg>
  );
}

export function CVWebExperience({ data }: CVWebExperienceProps) {
  const fullName = `${data.personal.firstName} ${data.personal.lastName}`;
  const yearsMatch = data.executiveSummary.paragraphs[0]?.match(/(\d+)\s*Years?/i);
  const yearsExp = yearsMatch?.[1] ?? "10";

  return (
    <div className="bg-mesh min-h-screen">
      <section className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
        <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#3d7fab]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-40 h-80 w-80 rounded-full bg-[#51ac52]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[280px_1fr]">
          <div className="mx-auto lg:mx-0">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-[image:var(--cc-gradient)] opacity-80 blur-sm" />
              <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-[var(--cc-bg)] sm:h-64 sm:w-64">
                <img
                  src={data.personal.photoUrl}
                  alt={fullName}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div>
            <p className="section-label mb-3">Salesforce Consultant</p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              <span className="gradient-text">{data.personal.firstName}</span>
              <br />
              <span className="text-white">{data.personal.lastName}</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-[var(--cc-paragraph)] sm:text-xl">
              {data.personal.title}
            </p>
            <p className="mt-2 text-sm text-[var(--cc-text-muted)]">
              {data.personal.location}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {data.highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--cc-accent)]/40 bg-[var(--cc-accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--cc-accent)]"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="glass-card rounded-2xl px-5 py-3">
                <p className="text-2xl font-bold gradient-text">{yearsExp}+</p>
                <p className="text-xs text-[var(--cc-text-muted)]">Years Experience</p>
              </div>
              <div className="glass-card rounded-2xl px-5 py-3 ring-1 ring-[var(--cc-accent)]/30">
                <p className="text-2xl font-bold gradient-text">
                  {data.certifications.length}
                </p>
                <p className="text-xs font-medium text-[var(--cc-accent)]">
                  Salesforce Certs
                </p>
              </div>
              <div className="glass-card rounded-2xl px-5 py-3">
                <p className="text-2xl font-bold gradient-text">
                  {data.skills.length}
                </p>
                <p className="text-xs text-[var(--cc-text-muted)]">Core Skills</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 text-sm">
              <a
                href={`mailto:${data.personal.email}`}
                className="text-[var(--cc-teal)] underline-offset-4 hover:underline"
              >
                {data.personal.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="certifications" className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="section-label mb-2">Trailblazer</p>
          <h2 className="mb-4 text-3xl font-bold text-white">
            {data.certifications.length} Salesforce Certifications
          </h2>

          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <img
              src={trailheadBanner}
              alt="Trailblazer profile, Consultant Cloud"
              className="h-auto w-full"
            />
          </div>

          <div className="mt-8">
            <p className="section-label mb-2">Credentials</p>
            <h3 className="text-2xl font-bold text-white">Certified Expertise</h3>
            <p className="mt-2 max-w-xl text-sm text-[var(--cc-paragraph)]">
              Each certification represents months of study, hands-on experience,
              and proctored examination. A verified benchmark of Salesforce
              capability.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {data.certifications.map((cert) => (
              <div
                key={cert.name}
                className="group relative overflow-hidden rounded-2xl border border-[var(--cc-accent)]/20 bg-[var(--cc-bg-card)] p-5 transition hover:border-[var(--cc-accent)]/50 hover:shadow-[var(--cc-glow)]"
              >
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[var(--cc-accent)]/5 blur-2xl transition group-hover:bg-[var(--cc-accent)]/10" />
                <div className="relative flex gap-4">
                  <CertShield />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold leading-snug text-white">
                      {cert.name}
                    </p>
                    <p className="mt-1.5 text-xs font-medium text-[var(--cc-teal)]">
                      Earned {cert.dateEarned}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="section-label mb-2">About</p>
          <h2 className="mb-8 text-3xl font-bold text-white">Executive Summary</h2>
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <div className="space-y-4 text-[var(--cc-paragraph)] leading-relaxed">
                  {data.executiveSummary.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {data.executiveSummary.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card group flex items-center justify-between rounded-2xl p-5 transition hover:border-[var(--cc-accent)]/40"
                  >
                    <div>
                      <p className="font-semibold text-white group-hover:text-[var(--cc-accent)]">
                        {link.label}
                      </p>
                      <p className="mt-1 truncate text-xs text-[var(--cc-text-muted)]">
                        {link.url}
                      </p>
                    </div>
                    <span className="text-[var(--cc-accent)]">→</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xs lg:mx-0 lg:max-w-none">
              <div className="absolute -inset-1 rounded-2xl bg-[image:var(--cc-gradient)] opacity-30 blur-md" />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <img
                  src={ourMission}
                  alt="Consultant Cloud mission: empowering Salesforce professionals worldwide"
                  className="h-auto w-full"
                />
              </div>
              <p className="mt-3 text-center text-xs text-[var(--cc-text-muted)]">
                Empowering Salesforce professionals worldwide
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="section-label mb-2">Expertise</p>
          <h2 className="mb-8 text-3xl font-bold text-white">Skills</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {data.skills.map((skill) => (
              <div key={skill.name} className="glass-card rounded-2xl p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-medium text-white">{skill.name}</span>
                  <span className="text-xs text-[var(--cc-text-muted)]">
                    {skill.level}/5
                  </span>
                </div>
                <div className="skill-bar-track">
                  <div
                    className="skill-bar-fill"
                    style={{ width: `${(skill.level / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="section-label mb-2">Sectors</p>
          <h2 className="mb-8 text-3xl font-bold text-white">Industry Experience</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {data.industryExperience.map((item) => (
              <div
                key={item.label}
                className="glass-card flex items-start gap-4 rounded-2xl p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[image:var(--cc-gradient)]">
                  <IndustryIcon icon={item.icon} className="h-5 w-5" />
                </div>
                <p className="text-sm leading-relaxed text-[var(--cc-paragraph)]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="section-label mb-2">Career</p>
          <h2 className="mb-10 text-3xl font-bold text-white">Work Experience</h2>

          <div className="relative space-y-8 pl-8">
            <div className="timeline-line absolute bottom-0 left-[7px] top-0 w-0.5 opacity-40" />

            {data.workExperience.map((role, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-8 top-6 h-3.5 w-3.5 rounded-full bg-[image:var(--cc-gradient)] ring-4 ring-[var(--cc-bg)]" />
                <div className="glass-card rounded-2xl p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{role.title}</h3>
                      <p className="mt-1 font-medium text-[var(--cc-teal)]">
                        {role.company}
                      </p>
                    </div>
                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-[var(--cc-text-muted)]">
                      {role.dateRange}
                    </span>
                  </div>

                  {role.subRoles?.map((sub) => (
                    <div key={sub.heading} className="mt-5 border-t border-white/5 pt-5">
                      <p className="mb-3 text-sm font-semibold italic text-[var(--cc-blue)]">
                        {sub.heading}
                      </p>
                      <ul className="space-y-2">
                        {sub.bullets.map((b, j) => (
                          <li
                            key={j}
                            className="flex gap-2 text-sm leading-relaxed text-[var(--cc-paragraph)]"
                          >
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--cc-accent)]" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {role.bullets && (
                    <ul className="mt-4 space-y-2">
                      {role.bullets.map((b, j) => (
                        <li
                          key={j}
                          className="flex gap-2 text-sm leading-relaxed text-[var(--cc-paragraph)]"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--cc-accent)]" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="section-label mb-2">Education</p>
          <h2 className="mb-8 text-3xl font-bold text-white">Formal Education</h2>
          {data.education.map((edu) => (
            <div
              key={edu.degree}
              className="glass-card flex flex-wrap items-center justify-between gap-4 rounded-2xl p-6"
            >
              <div>
                <p className="text-lg font-semibold text-white">{edu.degree}</p>
                <p className="text-[var(--cc-paragraph)]">{edu.institution}</p>
              </div>
              <span className="rounded-full bg-white/5 px-4 py-1.5 text-sm text-[var(--cc-text-muted)]">
                {edu.dateRange}
              </span>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/5 px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-sm text-[var(--cc-text-muted)]">
          <p>
            © {new Date().getFullYear()} {fullName}
          </p>
          <p>
            Founder of{" "}
            <a
              href="https://www.consultantcloud.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--cc-accent)] hover:underline"
            >
              ConsultantCloud.io
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
