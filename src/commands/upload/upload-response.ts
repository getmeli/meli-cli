export interface UploadResponse {
  release: {
    _id: string;
    date: Date;
    name: string;
    siteId: string;
    branches: string[];
  };
  urls: string[];
}
