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

export interface ValidationResult {
  isValid: boolean;
  userDetails?: {
    name?: string;
    designation?: string;
    city?: string;
    registrationDate?: string;
  };
}
