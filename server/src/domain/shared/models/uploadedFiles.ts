class UploadedFiles {
  public readonly fileType: string;
  public readonly path: string;

  constructor(fileType: string, path: string) {
    this.fileType = fileType;
    this.path = path;
  }

  public static fromJson() {}

  public static toJson() {}
}

export { UploadedFiles };
