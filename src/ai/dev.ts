import { config } from 'dotenv';
config();

// Note: The validate-qr-code flow is no longer used for primary validation,
// but is kept here for potential future use or as a reference.
import '@/ai/flows/validate-qr-code.ts';
