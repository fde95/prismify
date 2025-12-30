export function convertImage(file, format, quality) {
  // returns { name, url, size, originalSize }
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    img.onerror = (err) => reject(err);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // If PNG requested, pass undefined quality so browser keeps default (lossless for PNG)
      const blobQuality = format === 'png' ? undefined : quality;

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            // fallback: resolve with original file
            resolve({
              name: file.name.replace(/\.\w+$/, `.${format}`),
              url: URL.createObjectURL(file),
              size: file.size,
              originalSize: file.size,
            });
            return;
          }

          const newName = file.name.replace(/\.\w+$/, `-compressed-by-prismify.${format}`);

          resolve({
            name: newName,
            url: URL.createObjectURL(blob),
            size: blob.size,
            originalSize: file.size,
          });
        },
        `image/${format}`,
        blobQuality
      );
    };

    reader.readAsDataURL(file);
  });
}
