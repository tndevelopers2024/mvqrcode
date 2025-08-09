'use server';

/**
 * @fileOverview A QR code validation AI agent.
 * THIS FLOW IS NO LONGER USED FOR PRIMARY VALIDATION.
 * Validation is now handled by checking a unique ID against the database.
 * This file is kept for reference purposes.
 *
 * - validateQrCode - A function that handles the QR code validation process.
 * - ValidateQrCodeInput - The input type for the validateQrCode function.
 * - ValidateQrCodeOutput - The return type for the validateQrCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateQrCodeInputSchema = z.object({
  qrCodeData: z.string().describe('The data extracted from the QR code.'),
});
export type ValidateQrCodeInput = z.infer<typeof ValidateQrCodeInputSchema>;

const ValidateQrCodeOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the QR code is valid or not.'),
  userDetails: z
    .object({
      name: z.string().optional().describe('The name of the user.'),
      designation: z.string().optional().describe('The designation of the user.'),
      city: z.string().optional().describe('The city of the user.'),
      registrationDate: z.string().optional().describe('The registration date of the user.'),
    })
    .optional()
    .describe('The details of the user if the QR code is valid.'),
});
export type ValidateQrCodeOutput = z.infer<typeof ValidateQrCodeOutputSchema>;

export async function validateQrCode(input: ValidateQrCodeInput): Promise<ValidateQrCodeOutput> {
  return validateQrCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'validateQrCodePrompt',
  input: {schema: ValidateQrCodeInputSchema},
  output: {schema: ValidateQrCodeOutputSchema},
  prompt: `You are an expert system for validating conference registration QR codes.

You will receive data extracted from a QR code. Your job is to determine if it represents a valid registration.

A valid QR code will contain a unique identifier (UUID). If the data is not in a UUID format, it is invalid.

If it is valid, extract the user details, including name, designation, city and registrationDate.

If it is not valid, set isValid to false, and leave userDetails blank.

QR Code Data: {{{qrCodeData}}}
`,
});

const validateQrCodeFlow = ai.defineFlow(
  {
    name: 'validateQrCodeFlow',
    inputSchema: ValidateQrCodeInputSchema,
    outputSchema: ValidateQrCodeOutputSchema,
  },
  async input => {
    // This is a fallback and should not be the primary validation method.
    // Primary validation happens via direct database lookup in actions.ts.
    const {output} = await prompt(input);
    return output!;
  }
);
