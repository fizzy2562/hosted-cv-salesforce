import type { CVData } from "@/types/cv";
import { INDUSTRY_ICON_PATHS } from "./CVParts";

interface CVPrintDocumentProps {
  data: CVData;
  id?: string;
  showEmail?: boolean;
}

/** A4 at 96dpi — the export in download-pdf.ts relies on these exact dimensions */
export const PRINT_PAGE_WIDTH = 794;
export const PRINT_PAGE_HEIGHT = 1123;

/** Max bullets rendered per role/sub-role so the document fits one page */
const MAX_BULLETS = 5;

const C = {
  green: "#39803a",
  greenLight: "#51ac52",
  teal: "#4da68b",
  blue: "#3d7fab",
  dark: "#242424",
  gray: "#6d6d6d",
  grayLight: "#9ca3af",
  sidebar: "#030a03",
  sidebarMid: "#0a140a",
  white: "#ffffff",
};

function shortenCertName(name: string): string {
  return name.replace(/^Salesforce Certified /i, "").replace(/^Certified /i, "");
}

function PrintPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      width={72}
      height={72}
      style={{ width: 72, height: 72, objectFit: "cover", display: "block" }}
    />
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <h2
      style={{
        margin: "0 0 6px",
        fontSize: 9.5,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        color: C.greenLight,
      }}
    >
      {children}
    </h2>
  );
}

function MainTitle({ children }: { children: string }) {
  return (
    <h2
      style={{
        margin: "0 0 8px",
        paddingBottom: 4,
        fontSize: 11.5,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        color: C.green,
        borderBottom: `2px solid ${C.greenLight}`,
      }}
    >
      {children}
    </h2>
  );
}

/** html2canvas does not render ul/li list markers, so draw bullets explicitly */
function BulletList({ bullets }: { bullets: string[] }) {
  return (
    <div style={{ margin: 0 }}>
      {bullets.slice(0, MAX_BULLETS).map((b, i) => (
        <div key={i} style={{ display: "flex", gap: 5, marginBottom: 3, fontSize: 10, lineHeight: 1.42, color: "#374151" }}>
          <span style={{ color: C.green, flexShrink: 0 }}>•</span>
          <span>{b}</span>
        </div>
      ))}
    </div>
  );
}

function SkillBar({ level }: { level: number }) {
  const pct = Math.max(0, Math.min(100, (level / 5) * 100));
  return (
    <div
      style={{
        height: 6,
        borderRadius: 3,
        background: "rgba(255,255,255,0.14)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          borderRadius: 3,
          background: `linear-gradient(90deg, ${C.blue}, ${C.teal}, ${C.greenLight})`,
        }}
      />
    </div>
  );
}

/**
 * Single-page A4 layout captured by download-pdf.ts.
 * No Tailwind classes (html2canvas cannot parse Tailwind v4 oklab colours)
 * and no URLs (print noise). Content is clipped at one page — keep it fitting.
 */
export function CVPrintDocument({
  data,
  id = "cv-document-print",
  showEmail = true,
}: CVPrintDocumentProps) {
  const fullName = `${data.personal.firstName} ${data.personal.lastName}`;

  return (
    <div
      id={id}
      style={{
        width: PRINT_PAGE_WIDTH,
        height: PRINT_PAGE_HEIGHT,
        overflow: "hidden",
        boxSizing: "border-box",
        background: C.white,
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", height: "100%", background: C.white }}>
        {/* Sidebar */}
        <aside
          style={{
            width: 224,
            flexShrink: 0,
            boxSizing: "border-box",
            padding: "20px 16px",
            color: C.white,
            background: `linear-gradient(180deg, ${C.sidebarMid} 0%, ${C.sidebar} 100%)`,
          }}
        >
          <div
            style={{
              height: 4,
              margin: "-20px -16px 14px",
              background: `linear-gradient(90deg, ${C.blue}, ${C.teal}, ${C.greenLight})`,
            }}
          />

          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            <div
              style={{
                padding: 2,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${C.blue}, ${C.teal}, ${C.greenLight})`,
              }}
            >
              <div style={{ width: 72, height: 72, borderRadius: "50%", overflow: "hidden", background: C.sidebar }}>
                <PrintPhoto src={data.personal.photoUrl} alt={fullName} />
              </div>
            </div>
          </div>

          <div style={{ borderBottom: `1px solid rgba(255,255,255,0.15)`, paddingBottom: 13, marginBottom: 13 }}>
            <SectionTitle>Executive Summary</SectionTitle>
            {data.highlights.map((item) => (
              <p key={item} style={{ margin: "0 0 3px", fontSize: 9, lineHeight: 1.4, color: C.greenLight, fontWeight: 600 }}>
                • {item}
              </p>
            ))}
            {data.executiveSummary.paragraphs.map((p, i) => (
              <p key={i} style={{ margin: "5px 0 0", fontSize: 9, lineHeight: 1.42, color: "rgba(255,255,255,0.9)" }}>
                {p}
              </p>
            ))}
          </div>

          <div style={{ borderBottom: `1px solid rgba(255,255,255,0.15)`, paddingBottom: 13, marginBottom: 13 }}>
            <SectionTitle>Certifications</SectionTitle>
            {data.certifications.map((cert) => (
              <div key={cert.name} style={{ display: "flex", gap: 4, marginBottom: 4, fontSize: 9, lineHeight: 1.35 }}>
                <span style={{ color: C.greenLight }}>✓</span>
                <div>
                  <span style={{ fontWeight: 600 }}>{shortenCertName(cert.name)}</span>
                  {cert.dateEarned && (
                    <span style={{ fontSize: 8, color: C.teal }}> ({cert.dateEarned})</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderBottom: `1px solid rgba(255,255,255,0.15)`, paddingBottom: 13, marginBottom: 13 }}>
            <SectionTitle>Skills</SectionTitle>
            {data.skills.map((skill) => (
              <div key={skill.name} style={{ marginBottom: 9 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: 6,
                    marginBottom: 4,
                  }}
                >
                  <span style={{ fontSize: 9.5, fontWeight: 600 }}>{skill.name}</span>
                  <span style={{ fontSize: 8, color: C.teal, flexShrink: 0 }}>
                    {skill.level}/5
                  </span>
                </div>
                <SkillBar level={skill.level} />
              </div>
            ))}
          </div>

          <div>
            <SectionTitle>Industry Experience</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {data.industryExperience.map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 8px",
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 7,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: `linear-gradient(135deg, ${C.blue}, ${C.teal}, ${C.greenLight})`,
                    }}
                  >
                    <svg viewBox="0 0 24 24" width={13} height={13} aria-hidden>
                      <path
                        fill="#ffffff"
                        d={INDUSTRY_ICON_PATHS[item.icon] ?? INDUSTRY_ICON_PATHS.building}
                      />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontSize: 9,
                      lineHeight: 1.35,
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.94)",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <main style={{ flex: 1, boxSizing: "border-box", padding: "20px 24px", color: C.dark }}>
          <header style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: 12, marginBottom: 12 }}>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>
              <span style={{ color: C.blue }}>{data.personal.firstName}</span>{" "}
              {data.personal.lastName}
            </h1>
            <p style={{ margin: "3px 0 0", fontSize: 12, fontStyle: "italic", color: C.gray }}>
              {data.personal.title}
            </p>
            <p style={{ margin: "6px 0 0", fontSize: 10, color: C.gray }}>
              {showEmail && (
                <>
                  <span style={{ color: C.green }}>{data.personal.email}</span>
                  <span style={{ margin: "0 8px", color: "#d1d5db" }}>|</span>
                </>
              )}
              {data.personal.location}
            </p>
          </header>

          <div style={{ marginBottom: 12 }}>
            <MainTitle>Work Experiences</MainTitle>
            {data.workExperience.map((role) => (
              <div key={`${role.title}-${role.company}`} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                  <h3 style={{ margin: 0, fontSize: 11.5, fontWeight: 700, textTransform: "uppercase" }}>
                    {role.title}
                  </h3>
                  <span style={{ fontSize: 9.5, color: C.grayLight, flexShrink: 0 }}>{role.dateRange}</span>
                </div>
                <p style={{ margin: "2px 0 4px", fontSize: 11, fontWeight: 600, color: C.green }}>
                  {role.company}
                </p>
                {role.subRoles?.map((sub) => (
                  <div key={sub.heading} style={{ marginBottom: 8 }}>
                    <p style={{ margin: "0 0 3px", fontSize: 10, fontWeight: 600, fontStyle: "italic", color: C.blue, lineHeight: 1.35 }}>
                      {sub.heading}
                    </p>
                    <BulletList bullets={sub.bullets} />
                  </div>
                ))}
                {role.bullets && <BulletList bullets={role.bullets} />}
              </div>
            ))}
          </div>

          <div>
            <MainTitle>Formal Education</MainTitle>
            {data.education.map((edu) => (
              <div
                key={`${edu.degree}-${edu.institution}`}
                style={{ display: "flex", justifyContent: "space-between", gap: 8 }}
              >
                <div>
                  <p style={{ margin: 0, fontSize: 11, fontWeight: 600 }}>{edu.degree}</p>
                  <p style={{ margin: 0, fontSize: 10, color: C.gray }}>{edu.institution}</p>
                </div>
                <span style={{ fontSize: 9.5, color: C.grayLight }}>{edu.dateRange}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 14,
              height: 2,
              background: `linear-gradient(90deg, ${C.blue}, ${C.teal}, ${C.greenLight})`,
            }}
          />
        </main>
      </div>
    </div>
  );
}
