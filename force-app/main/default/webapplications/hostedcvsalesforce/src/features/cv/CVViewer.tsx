import { useState } from "react";
import type { CVData } from "@/types/cv";
import { CVWebExperience } from "./CVWebExperience";
import { CVPrintDocument } from "./CVPrintDocument";
import { SiteNav } from "./SiteNav";
import { DownloadDialog } from "./DownloadDialog";
import { downloadElementAsPDF, preloadImage } from "@/lib/download-pdf";

export function CVViewer({ data }: { data: CVData }) {
  const [downloading, setDownloading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [captureWithEmail, setCaptureWithEmail] = useState(true);
  const [capturing, setCapturing] = useState(false);

  const fullName = `${data.personal.firstName} ${data.personal.lastName}`;

  function handleDownloadClick() {
    setDialogOpen(true);
  }

  async function handleDownload(includeEmail: boolean) {
    try {
      setDownloading(true);
      setCaptureWithEmail(includeEmail);
      setCapturing(true);

      try {
        await preloadImage(data.personal.photoUrl);
      } catch {
        // Photo may still render if already cached
      }

      await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
      await new Promise((resolve) => setTimeout(resolve, 500));

      const suffix = includeEmail ? "" : "_no_email";
      await downloadElementAsPDF(
        "cv-document-print",
        `Ciaran_Fitzgerald_CV${suffix}.pdf`,
      );

      setDialogOpen(false);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert(
        "Failed to generate PDF. Please try again. If the issue persists, try a different browser.",
      );
    } finally {
      setCapturing(false);
      setDownloading(false);
      setCaptureWithEmail(true);
    }
  }

  return (
    <>
      <SiteNav
        name={fullName}
        onDownload={handleDownloadClick}
        downloading={downloading}
      />
      <CVWebExperience data={data} />

      {capturing && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0"
          style={{ zIndex: -1 }}
        >
          <CVPrintDocument data={data} showEmail={captureWithEmail} />
        </div>
      )}

      <DownloadDialog
        open={dialogOpen}
        onClose={() => !downloading && setDialogOpen(false)}
        onDownloadWithEmail={() => handleDownload(true)}
        onDownloadWithoutEmail={() => handleDownload(false)}
        downloading={downloading}
      />
    </>
  );
}
