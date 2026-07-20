interface SiteNavProps {
  onDownload: () => void;
  downloading: boolean;
  name: string;
}

export function SiteNav({ onDownload, downloading, name }: SiteNavProps) {
  return (
    <header className="no-print fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-[var(--cc-bg)]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="#" className="text-sm font-bold tracking-tight">
          <span className="gradient-text">{name}</span>
        </a>
        <nav className="flex items-center gap-2 sm:gap-3">
          <a
            href="#experience"
            className="hidden rounded-full px-3 py-1.5 text-sm text-[var(--cc-text-muted)] transition hover:text-white sm:inline-block"
          >
            Experience
          </a>
          <a
            href="#certifications"
            className="hidden rounded-full px-3 py-1.5 text-sm text-[var(--cc-text-muted)] transition hover:text-white sm:inline-block"
          >
            Certs
          </a>
          <button
            type="button"
            onClick={onDownload}
            disabled={downloading}
            className="cc-btn-gradient px-4 py-2 text-xs disabled:opacity-60 sm:px-5 sm:text-sm"
          >
            {downloading ? "Generating…" : "Download CV"}
          </button>
        </nav>
      </div>
    </header>
  );
}
