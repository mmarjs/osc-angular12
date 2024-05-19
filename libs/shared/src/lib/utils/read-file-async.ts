export type FileType = File | { file: File };

export const readFileAsync = (type: FileType) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    const file = type instanceof File ? type : type?.file;
    const ext = file?.name?.split('.')?.pop();

    if (typeof ext !== 'string') {
      resolve(undefined);
    }

    reader.onerror = (error) => {
      reject(error);
    };

    reader.onload = () => {
      resolve({
        path: reader.result,
        fileTitle: file.name,
        fileURL: reader.result,
        format: ext,
        originalFilename: file.name,
      });
    };

    reader.readAsDataURL(file);
  });
