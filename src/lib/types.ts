export interface Registration {
  id: string;
  name: string;
  email: string;
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
}

export interface UserDetails {
  name?: string;
  designation?: string;
  city?: string;
  registrationDate?: string;
  profileImage?: string;
  qrCodeImage?: string;
}

export interface ValidationResult {
  isValid: boolean;
  userDetails?: UserDetails;
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

