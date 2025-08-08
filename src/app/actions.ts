'use server';

import { z } from 'zod';
import { validateQrCode } from '@/ai/flows/validate-qr-code';
import { registrations } from '@/lib/db';
import type { Registration, ValidationResult } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import QRCode from 'qrcode';

const registrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  designation: z.string().min(2, 'Designation is required.'),
  city: z.string().min(2, 'City is required.'),
});

async function generateQrCodeDataUri(text: string): Promise<string> {
    try {
        const qrCodeDataUri = await QRCode.toDataURL(text, {
            errorCorrectionLevel: 'H',
            type: 'image/png',
            rendererOpts: {
                quality: 0.9,
            },
        });
        return qrCodeDataUri;
    } catch (err) {
        console.error('Failed to generate QR code', err);
        throw new Error('Failed to generate QR code');
    }
}

export async function registerUser(formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    const validatedData = registrationSchema.parse(data);

    const registrationDate = new Date().toISOString();
    const qrCodeContent = JSON.stringify({ ...validatedData, registrationDate });
    
    const qrCodeDataUri = await generateQrCodeDataUri(qrCodeContent);
    
    const newRegistration: Registration = {
      id: crypto.randomUUID(),
      ...validatedData,
      registrationDate,
      qrCodeDataUri,
      qrCodeContent: qrCodeContent,
    };

    registrations.push(newRegistration);
    revalidatePath('/admin');
    
    return { success: true, registration: newRegistration };
  } catch (error) {
    console.error('Registration failed:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: "Validation failed", issues: error.errors };
    }
    return { success: false, error: 'An unexpected error occurred during registration.' };
  }
}

export async function validateRegistration(qrData: string): Promise<ValidationResult> {
  try {
    // First, check if a registration with this exact QR content exists
    const registeredUser = registrations.find(reg => reg.qrCodeContent === qrData);

    if (!registeredUser) {
      // If no exact match, ask the AI to parse it. 
      // This handles cases where the QR might be slightly different but still valid JSON.
      const aiResult = await validateQrCode({ qrCodeData: qrData });
      
      if (!aiResult.isValid || !aiResult.userDetails) {
        return { isValid: false };
      }

      // Check if the parsed details loosely match any registration
      const matchedUser = registrations.find(reg => 
        reg.name === aiResult.userDetails?.name &&
        reg.designation === aiResult.userDetails?.designation &&
        reg.city === aiResult.userDetails?.city
      );

      if (matchedUser) {
        return { isValid: true, userDetails: matchedUser };
      }

      return { isValid: false };
    }

    // Exact match found
    return { 
      isValid: true, 
      userDetails: {
        name: registeredUser.name,
        designation: registeredUser.designation,
        city: registeredUser.city,
        registrationDate: registeredUser.registrationDate
      } 
    };
  } catch (error) {
    console.error('Validation failed:', error);
    return { isValid: false };
  }
}

export async function getRegistrationById(id: string) {
  return registrations.find(reg => reg.id === id) || null;
}

export async function getAllRegistrations() {
  return registrations;
}
