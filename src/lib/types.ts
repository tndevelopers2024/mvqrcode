export interface Registration {
  id: string;
  name: string;
  email: string;
  designation: string;
  city: string;
  registrationDate: string;
  qrCodeDataUri: string;
  qrCodeContent: string;
}

export interface UserDetails {
  name?: string;
  designation?: string;
  city?: string;
  registrationDate?: string;
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
    validatedUserDetails?: UserDetails;
}
