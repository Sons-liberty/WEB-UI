// TypeScript types for the AI Image Processing application

export interface ServiceInfo {
  id: string;
  name: string;
  description: string;
}

export interface ServiceCategory {
  [subcategory: string]: ServiceInfo[];
}

export interface ServicesResponse {
  document: ServiceCategory;
  matting: ServiceCategory;
  watermark: ServiceCategory;
}

export interface ProcessRequest {
  image: string; // Base64 encoded image with data URI
  service: string; // Service ID
}

export interface ProcessResponse {
  success: boolean;
  result?: string; // Base64 encoded result image
  service?: string;
  type?: string;
  error?: string;
}

export interface BatchProcessRequest {
  images: string[]; // Array of Base64 encoded images
  service: string;
}

export interface BatchProcessResponse {
  success: boolean;
  results?: Array<{
    success?: boolean;
    result?: string;
    error?: string;
  }>;
  service?: string;
  type?: string;
  error?: string;
}

export interface HealthResponse {
  status: string;
  pipelines_loaded: number;
  available_services: string[];
}

export type ProcessingStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error';

export interface UploadState {
  originalImage: string | null;
  processedImage: string | null;
  selectedService: string | null;
  status: ProcessingStatus;
  error: string | null;
  fileName: string | null;
}
