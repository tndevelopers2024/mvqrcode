'use server';

import { z } from 'zod';
import { validateQrCode } from '@/ai/flows/validate-qr-code';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
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
    
    const newRegistration: Omit<Registration, 'id'> = {
      ...validatedData,
      registrationDate,
      qrCodeDataUri,
      qrCodeContent: qrCodeContent,
    };

    const docRef = await addDoc(collection(db, "registrations"), newRegistration);

    revalidatePath('/admin');
    
    return { success: true, registration: { ...newRegistration, id: docRef.id } };
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
    // First, check for an exact match in the database
    const q = query(collection(db, "registrations"), where("qrCodeContent", "==", qrData));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const registeredUser = { id: doc.id, ...doc.data() } as Registration;
        return { 
          isValid: true, 
          userDetails: {
            name: registeredUser.name,
            designation: registeredUser.designation,
            city: registeredUser.city,
            registrationDate: registeredUser.registrationDate
          } 
        };
    }

    // If no exact match, ask the AI to parse it as a fallback.
    const aiResult = await validateQrCode({ qrCodeData: qrData });
    
    // The AI will determine if the format is plausible, even if it's not in the DB.
    // This handles cases where the QR might be valid in format but not registered.
    if (aiResult.isValid && aiResult.userDetails) {
      // We can trust the AI's validation if it extracts details.
      // But we will still mark it as invalid if it's not in our DB.
      // A more advanced implementation might check for "close" matches here.
      return { isValid: false, userDetails: aiResult.userDetails };
    }

    return { isValid: false };
  } catch (error) {
    console.error('Validation failed:', error);
    return { isValid: false };
  }
}

export async function getRegistrationById(id: string) {
    // This function might need adjustment if you need to fetch a single document by ID from Firestore.
    // For now, it's not used in a way that requires Firestore fetching.
    // To implement, you would use getDoc(doc(db, "registrations", id)).
    return null;
}

export async function getAllRegistrations(): Promise<Registration[]> {
  const querySnapshot = await getDocs(collection(db, "registrations"));
  const registrations = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
  } as Registration));
  return registrations;
}
