import { PRINT_PAGE_WIDTH, PRINT_PAGE_HEIGHT } from "@/features/cv/CVPrintDocument";

/**
 * Capture the print layout as a single-page A4 PDF download.
 *
 * Experience Cloud + Tailwind v4 use oklch() colours that html2canvas cannot
 * parse. We clone the print document into a clean iframe (no stylesheets) so
 * only the inline hex/rgb styles on CVPrintDocument are visible.
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
      `Print content is ${element.scrollHeight}px tall but the page is ${PRINT_PAGE_HEIGHT}px — overflow will be clipped.`,
    );
  }

  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.cssText = [
    "position:fixed",
    "left:-10000px",
    "top:0",
    `width:${PRINT_PAGE_WIDTH}px`,
    `height:${PRINT_PAGE_HEIGHT}px`,
    "border:0",
    "opacity:0",
    "pointer-events:none",
  ].join(";");
  document.body.appendChild(iframe);

  try {
    const iframeDoc = iframe.contentDocument;
    if (!iframeDoc) throw new Error("Could not create print iframe");

    iframeDoc.open();
    iframeDoc.write(
      `<!DOCTYPE html><html><head><meta charset="utf-8"></head>` +
        `<body style="margin:0;padding:0;background:#ffffff;color:#242424;"></body></html>`,
    );
    iframeDoc.close();

    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.position = "static";
    clone.style.left = "auto";
    clone.style.top = "auto";
    clone.style.zIndex = "auto";
    clone.style.margin = "0";
    iframeDoc.body.appendChild(clone);

    const images = Array.from(clone.querySelectorAll("img"));
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

    // Allow layout in the iframe
    await new Promise((resolve) => setTimeout(resolve, 50));

    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      imageTimeout: 15000,
      width: PRINT_PAGE_WIDTH,
      height: PRINT_PAGE_HEIGHT,
      windowWidth: PRINT_PAGE_WIDTH,
      windowHeight: PRINT_PAGE_HEIGHT,
    });

    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error("Canvas render produced empty output");
    }

    const imgData = canvas.toDataURL("image/jpeg", 0.92);
    if (imgData.length < 1000) {
      throw new Error("Canvas produced invalid image data");
    }

    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, pageHeight);
    pdf.save(filename);
  } finally {
    iframe.remove();
  }
}

export async function preloadImage(src: string): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}
