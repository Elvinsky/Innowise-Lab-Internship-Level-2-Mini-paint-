export interface Photo {
  downloadUrl: string;
  name: string;
  metadata: {
    uploadedBy: string;
    uploadedAt: string;
    canvasCtx: string;
  };
}
