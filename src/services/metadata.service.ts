import { glob } from "glob";
import fs from "node:fs/promises";
class MetadataService {
  public getCLContent() {
    //todo: load files from github
    return glob(
      "../dozi-component-library/projects/component-lib/components/**/*.html"
    )
      .then((files) => {
        return files.map((file) => ({
          path: file,
          name: file.substring(file.lastIndexOf("/") + 1),
        }));
      })
      .then((files) => {
        return Promise.all(
          files.map((file) => {
            return fs
              .readFile(file.path, { encoding: "utf-8" })
              .then((content: any) => ({ name: file.name, content }));
          })
        );
      });
  }
}

export const metadataService = new MetadataService();
