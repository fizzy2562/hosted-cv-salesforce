"use client";

interface DownloadDialogProps {
  open: boolean;
  onClose: () => void;
  onDownloadWithEmail: () => void;
  onDownloadWithoutEmail: () => void;
  downloading: boolean;
}

export function DownloadDialog({
  open,
  onClose,
  onDownloadWithEmail,
  onDownloadWithoutEmail,
  downloading,
}: DownloadDialogProps) {
  if (!open) return null;

  return (
    <div
      className="no-print fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[var(--cc-bg-card)] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="download-dialog-title"
      >
        <p className="section-label mb-1">Export</p>
        <h2
          id="download-dialog-title"
          className="text-xl font-bold text-white"
        >
          Download CV as PDF
        </h2>
        <p className="mt-2 text-sm text-[var(--cc-paragraph)]">
          Choose whether to include your email address on the A4 PDF export.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={onDownloadWithEmail}
            disabled={downloading}
            className="cc-btn-gradient px-4 py-3 text-sm disabled:opacity-60"
          >
            {downloading ? "Generating PDF…" : "Download with email address"}
          </button>
          <button
            type="button"
            onClick={onDownloadWithoutEmail}
            disabled={downloading}
            className="cc-btn-outline px-4 py-3 text-sm font-semibold disabled:opacity-60"
          >
            {downloading ? "Generating PDF…" : "Download without email address"}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={downloading}
            className="px-4 py-2 text-sm text-[var(--cc-text-muted)] hover:text-white disabled:opacity-60"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
