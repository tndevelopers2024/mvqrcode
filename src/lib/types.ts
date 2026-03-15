export interface Registration {
  id: string;
  name: string;
  email: string;
  profession: string;
  designation: string;
  city: string;
  registrationDate: string;
  profileImage?: string;
  qrCodeImage?: string;
  qrCodeDataUri?: string;
  qrCodeContent?: string;
  photoDataUri?: string;
  certificateImage?: string;
  certificateFile?: string;
  medicalCouncilNumber?: string;
  registeredByAdmin?: boolean;
}

export interface UserDetails {
  name?: string;
  designation?: string;
  city?: string;
  registrationDate?: string;
  profileImage?: string;
  qrCodeImage?: string;
  scanCount?: number;
  registeredByAdmin?: boolean;
  lastScanTime?: string;
}

export interface ValidationResult {
  isValid: boolean;
  userDetails?: UserDetails;
  scanCount?: number;
  lastScanTime?: string;
}

export interface ValidationLog {
  id: string;
  qrData: string;
  isValid: boolean;
  timestamp: string;
  details?: string;
  validatedUserDetails?: {
    name?: string;
    designation?: string;
    city?: string;
    registrationDate?: string;
  };
  scannedBy?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

