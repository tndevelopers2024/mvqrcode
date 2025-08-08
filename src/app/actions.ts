'use server';

import { z } from 'zod';
import { generateQrCode } from '@/ai/flows/generate-qr-code';
import { validateQrCode } from '@/ai/flows/validate-qr-code';
import { registrations } from '@/lib/db';
import type { Registration } from '@/lib/types';
import { revalidatePath } from 'next/cache';

const registrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  designation: z.string().min(2, 'Designation is required.'),
  city: z.string().min(2, 'City is required.'),
});

export async function registerUser(formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    const validatedData = registrationSchema.parse(data);

    const registrationDate = new Date().toISOString();
    const qrCodeContent = JSON.stringify({ ...validatedData, registrationDate });
    
    const qrResult = await generateQrCode({ registrationDetails: qrCodeContent });
    
    const newRegistration: Registration = {
      id: crypto.randomUUID(),
      ...validatedData,
      registrationDate,
      qrCodeDataUri: qrResult.qrCodeDataUri,
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

export async function validateRegistration(qrData: string) {
  try {
    const result = await validateQrCode({ qrCodeData: qrData });
    return result;
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
