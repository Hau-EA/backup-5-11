export function loadImage(file) {
  const dataURL = URL.createObjectURL(file);
  return new Promise((resolve) => {
    const img = new Image();
    img.addEventListener('load', () => {
      resolve(img);
      URL.revokeObjectURL(dataURL);
    });
    img.src = dataURL;
  });
}

export function toBlob(canvas, fileType) {
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        resolve(blob);
      },
      fileType,
      0.85
    );
  });
}

export async function resize(file, maxWidth) {
  maxWidth = maxWidth || 1024;
  const fileName = file.name;
  const fileType = file.type;
  const img = await loadImage(file);
  const width = img.width > maxWidth ? maxWidth : img.width;
  const ratio = width / img.width;
  const height = img.width > maxWidth ? img.height * ratio : img.height;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, width, height);

  const blob = await toBlob(canvas, fileType);
  const resizedFile = new File([blob], fileName, {
    type: fileType,
    lastModified: Date.now(),
  });
  return resizedFile;
}

export function isImage(file) {
  return file && file.type.split('/')[0] === 'image';
}

export async function fileDataToBlob(file, maxWidth) {
  maxWidth = maxWidth || 1024;
  const fileType = file.type;
  const img = await loadImage(file);
  const width = img.width > maxWidth ? maxWidth : img.width;
  const ratio = width / img.width;
  const height = img.width > maxWidth ? img.height * ratio : img.height;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, width, height);

  const blob = await toBlob(canvas, fileType);

  return blob;
}
