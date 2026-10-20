export interface UploadedFile {
  name: string;
  size?: number;
  uri: string;
  mimeType?: string;
  type?: 'image' | 'document';
}

export interface FormData {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  age: string;
  website: string;
  bio: string;
  role: string;
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  receiveNotifications: boolean;
  marketingConsent: boolean;
  interests: string[];
  satisfactionRating: number;
  uploadedFile?: UploadedFile | null;
  agreeToTerms: boolean;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  age?: string;
  website?: string;
  bio?: string;
  role?: string;
  uploadedFile?: string;
  agreeToTerms?: string;
}

export interface ConsoleSubmissionLog {
  id: string;
  timestamp: string;
  data: FormData;
}
