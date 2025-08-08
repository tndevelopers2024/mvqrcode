'use server';

/**
 * @fileOverview Generates a QR code from registration details.
 *
 * - generateQrCode - A function that generates a QR code from registration details.
 * - GenerateQrCodeInput - The input type for the generateQrCode function.
 * - GenerateQrCodeOutput - The return type for the generateQrCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQrCodeInputSchema = z.object({
  registrationDetails: z
    .string()
    .describe('The registration details to encode in the QR code.'),
});
export type GenerateQrCodeInput = z.infer<typeof GenerateQrCodeInputSchema>;

const GenerateQrCodeOutputSchema = z.object({
  qrCodeDataUri: z
    .string()
    .describe(
      'The QR code as a data URI that must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
    ),
});
export type GenerateQrCodeOutput = z.infer<typeof GenerateQrCodeOutputSchema>;

export async function generateQrCode(input: GenerateQrCodeInput): Promise<GenerateQrCodeOutput> {
  return generateQrCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQrCodePrompt',
  input: {schema: GenerateQrCodeInputSchema},
  output: {schema: GenerateQrCodeOutputSchema},
  prompt: `Generate a QR code as a data URI for the following registration details: {{{registrationDetails}}}. The QR code should be in PNG format.`,
});

const generateQrCodeFlow = ai.defineFlow(
  {
    name: 'generateQrCodeFlow',
    inputSchema: GenerateQrCodeInputSchema,
    outputSchema: GenerateQrCodeOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Generate a QR code for: ${input.registrationDetails}`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    return {qrCodeDataUri: media!.url!};
  }
);
