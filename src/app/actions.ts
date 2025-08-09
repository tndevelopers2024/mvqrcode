'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import type { Registration, ValidationResult, ValidationLog } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import QRCode from 'qrcode';
import { randomUUID } from 'crypto';

const registrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  designation: z.string().min(2, 'Designation is required.'),
  city: z.string().min(2, 'City is required.'),
  photoDataUri: z.string().optional(),
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

    const emailQuery = query(collection(db, "registrations"), where("email", "==", validatedData.email));
    const emailQuerySnapshot = await getDocs(emailQuery);

    if (!emailQuerySnapshot.empty) {
        return { success: false, error: 'A registration with this email already exists.' };
    }

    const registrationDate = new Date().toISOString();
    const uniqueId = randomUUID();
    
    const qrCodeDataUri = await generateQrCodeDataUri(uniqueId);
    
    const newRegistration: Omit<Registration, 'id'> = {
      ...validatedData,
      registrationDate,
      qrCodeDataUri,
      qrCodeContent: uniqueId,
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

async function logValidationAttempt(qrData: string, result: ValidationResult) {
  try {
    const logEntry = {
      qrData,
      isValid: result.isValid,
      timestamp: new Date().toISOString(),
      ...(result.isValid && { validatedUserDetails: result.userDetails }),
    };
    await addDoc(collection(db, 'validation_logs'), logEntry);
    revalidatePath('/admin/logs');
  } catch (error) {
    console.error('Failed to log validation attempt:', error);
  }
}

export async function validateRegistration(qrData: string): Promise<ValidationResult> {
  let result: ValidationResult;
  try {
    // The qrData is the unique ID. Check for an exact match in the database.
    const q = query(collection(db, "registrations"), where("qrCodeContent", "==", qrData));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const registeredUser = { id: doc.id, ...doc.data() } as Registration;
        result = { 
          isValid: true, 
          userDetails: {
            name: registeredUser.name,
            designation: registeredUser.designation,
            city: registeredUser.city,
            registrationDate: registeredUser.registrationDate
          } 
        };
    } else {
        // If no document is found with the unique ID, the QR code is invalid.
        result = { isValid: false };
    }

  } catch (error) {
    console.error('Validation failed:', error);
    result = { isValid: false };
  }
  
  await logValidationAttempt(qrData, result);
  return result;
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

export async function getValidationLogs(): Promise<ValidationLog[]> {
    const querySnapshot = await getDocs(query(collection(db, "validation_logs")));
    const logs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as ValidationLog));
    return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}
