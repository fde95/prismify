export function convertImage(file, format, quality) {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          resolve({
            name: file.name.replace(/\.\w+$/, `.${format}`),
            url: URL.createObjectURL(blob),
            size: blob.size,
          });
        },
        `image/${format}`,
        quality
      );
    };

    reader.readAsDataURL(file);
  });
}
