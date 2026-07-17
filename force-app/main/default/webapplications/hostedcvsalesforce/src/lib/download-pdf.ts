import { PRINT_PAGE_WIDTH, PRINT_PAGE_HEIGHT } from "@/features/cv/CVPrintDocument";

/**
 * Capture the print layout as a single-page A4 PDF download.
 * The element must be exactly PRINT_PAGE_WIDTH × PRINT_PAGE_HEIGHT so the
 * canvas maps 1:1 onto the A4 page — no tiling, no scaling, no distortion.
 */
export async function downloadElementAsPDF(
  elementId: string,
  filename: string,
): Promise<void> {
  const html2canvas = (await import("html2canvas")).default;
  const { jsPDF } = await import("jspdf");

  const element = document.getElementById(elementId);
  if (!element) throw new Error("CV document not found");

  if (element.scrollHeight > PRINT_PAGE_HEIGHT + 2) {
    console.warn(
      `Print content is ${element.scrollHeight}px tall but the page is ${PRINT_PAGE_HEIGHT}px — overflow will be clipped. Trim CV content or tighten CVPrintDocument.`,
    );
  }

  const images = Array.from(element.querySelectorAll("img"));
  await Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete && img.naturalWidth > 0) {
            resolve();
            return;
          }
          img.onload = () => resolve();
          img.onerror = () => resolve();
        }),
    ),
  );

  const canvas = await html2canvas(element, {
    scale: 3,
    useCORS: true,
    allowTaint: false,
    backgroundColor: "#ffffff",
    logging: false,
    imageTimeout: 15000,
    width: PRINT_PAGE_WIDTH,
    height: PRINT_PAGE_HEIGHT,
    windowWidth: PRINT_PAGE_WIDTH,
    // Isolate from parent page Tailwind oklab styles
    onclone: (clonedDoc) => {
      const cloned = clonedDoc.getElementById(elementId);
      if (!cloned) return;
      cloned.style.position = "absolute";
      cloned.style.left = "0";
      cloned.style.top = "0";
    },
  });

  if (canvas.width === 0 || canvas.height === 0) {
    throw new Error("Canvas render produced empty output");
  }

  const imgData = canvas.toDataURL("image/jpeg", 0.9);
  if (imgData.length < 1000) {
    throw new Error("Canvas produced invalid image data");
  }

  const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Canvas is exactly A4 aspect ratio, so fill the page edge to edge
  pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, pageHeight);
  pdf.save(filename);
}

export async function preloadImage(src: string): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}
