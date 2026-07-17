import type { ReactNode } from "react";

export function SidebarSection({
  title,
  children,
  variant = "web",
}: {
  title: string;
  children: ReactNode;
  variant?: "web" | "print";
}) {
  if (variant === "print") {
    return (
      <section className="border-b border-white/10 pb-3 last:border-b-0">
        <h2 className="mb-2 text-[10px] font-bold uppercase tracking-wide text-[#51ac52]">
          {title}
        </h2>
        {children}
      </section>
    );
  }

  return (
    <section className="border-b border-white/30 pb-5 last:border-b-0">
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function MainSection({
  title,
  children,
  variant = "web",
}: {
  title: string;
  children: ReactNode;
  variant?: "web" | "print";
}) {
  if (variant === "print") {
    return (
      <section className="mb-4">
        <h2
          className="mb-2 border-b-2 pb-0.5 text-[11px] font-bold uppercase tracking-wide"
          style={{ color: "#39803a", borderColor: "#51ac52" }}
        >
          {title}
        </h2>
        {children}
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="mb-4 border-b-2 border-[var(--cc-accent)] pb-1 text-sm font-bold uppercase tracking-wide text-[var(--cc-accent)]">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function SkillDots({
  level,
  max = 5,
  variant = "web",
}: {
  level: number;
  max?: number;
  variant?: "web" | "print";
}) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full border ${
            variant === "print"
              ? i < level
                ? "border-[#51ac52] bg-[#51ac52]"
                : "border-white/30 bg-transparent"
              : i < level
                ? "border-white bg-white"
                : "border-white bg-transparent"
          }`}
        />
      ))}
    </div>
  );
}

export const INDUSTRY_ICON_PATHS: Record<
  "plane" | "chip" | "store" | "building" | "shield" | "car",
  string
> = {
  plane:
    "M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z",
  chip: "M9 3V1h2v2h2V1h2v2h2a2 2 0 012 2v2h2v2h-2v2h2v2h-2v2a2 2 0 01-2 2h-2v2h-2v-2h-2v2H9v-2H7v2H5v-2H3a2 2 0 01-2-2v-2H1v-2h2v-2H1V7h2V5a2 2 0 012-2h2zm0 4a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V9a2 2 0 00-2-2H9zm2 2h2v2h-2V9zm4 0h2v2h-2V9z",
  store:
    "M4 10V7l2-4h12l2 4v3H4zm0 2h16v9H4v-9zm3 2v5h2v-5H7zm4 0v5h2v-5h-2zm4 0v5h2v-5h-2z",
  building:
    "M3 21V3h8v18H3zm10 0V8h8v13h-8zM7 7h2v2H7V7zm0 4h2v2H7v-2zm0 4h2v2H7v-2zm8-8h2v2h-2V7zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z",
  shield:
    "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm3.5 11h-1v3.5c0 .28-.22.5-.5.5h-4a.5.5 0 01-.5-.5V12h-1a.5.5 0 01-.35-.85l3.5-3.5c.2-.2.5-.2.7 0l3.5 3.5a.5.5 0 01-.35.85z",
  car: "M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z",
};

export function IndustryIcon({
  icon,
  className = "h-5 w-5",
}: {
  icon: "plane" | "chip" | "store" | "building" | "shield" | "car";
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} shrink-0 fill-white`} aria-hidden>
      <path d={INDUSTRY_ICON_PATHS[icon] ?? INDUSTRY_ICON_PATHS.building} />
    </svg>
  );
}
