import fs from "fs";
import path from "path";

const isDirectory = (filePath: string): boolean => {
  return fs.statSync(filePath).isDirectory();
};

/**
 * Extract all files at all levels in the current directory
 * @param dirPath directory path
 * @returns a string array contains all file paths
 */
export const readAllFilesInDirectory = (
  dirPath: string,
  files: string[] = []
): string[] => {
  const dirFiles = fs.readdirSync(dirPath);
  for (let file of dirFiles) {
    if (isDirectory(dirPath + "/" + file)) {
      files = readAllFilesInDirectory(dirPath + "/" + file, files);
    } else {
      files.push(path.join(dirPath, "/", file));
    }
  }

  return files.filter((file) => file.endsWith(".js"));
};
