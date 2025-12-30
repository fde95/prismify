import JSZip from "jszip";

export async function downloadImagesAsZip(images) {
  const zip = new JSZip();

  for (const img of images) {
    const response = await fetch(img.url);
    const blob = await response.blob();

    zip.file(img.name, blob);
  }

  const zipBlob = await zip.generateAsync({ type: "blob" });
  const zipUrl = URL.createObjectURL(zipBlob);

  const link = document.createElement("a");
  link.href = zipUrl;
  // Name required by spec
  link.download = "compressed-by-prismify.zip";
  link.click();

  URL.revokeObjectURL(zipUrl);
}
