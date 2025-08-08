'use client';

import { useState, useTransition } from 'react';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { validateRegistration } from '@/app/actions';
import type { ValidationResult } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export function QRValidator() {
  const [qrData, setQrData] = useState('');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleValidate = () => {
    if (!qrData.trim()) {
      toast({
        variant: 'destructive',
        title: 'Input Error',
        description: 'Please paste the QR code data to validate.',
      });
      return;
    }
    
    startTransition(async () => {
      setValidationResult(null);
      const result = await validateRegistration(qrData);
      setValidationResult(result);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>QR Code Validation</CardTitle>
        <CardDescription>Paste the text from a scanned QR code below to validate a conference pass.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Paste QR code data here..."
          value={qrData}
          onChange={(e) => setQrData(e.target.value)}
          rows={4}
        />
        <Button onClick={handleValidate} disabled={isPending || !qrData}>
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Validate
        </Button>

        {validationResult && (
          <Card className={validationResult.isValid ? 'border-green-500' : 'border-red-500'}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {validationResult.isValid ? (
                  <>
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    Pass is Valid
                  </>
                ) : (
                  <>
                    <XCircle className="h-6 w-6 text-red-500" />
                    Pass is Invalid
                  </>
                )}
              </CardTitle>
            </CardHeader>
            {validationResult.isValid && validationResult.userDetails && (
              <CardContent>
                <p><strong>Name:</strong> {validationResult.userDetails.name}</p>
                <p><strong>Designation:</strong> {validationResult.userDetails.designation}</p>
                <p><strong>City:</strong> {validationResult.userDetails.city}</p>
                <p><strong>Registered On:</strong> {validationResult.userDetails.registrationDate ? new Date(validationResult.userDetails.registrationDate).toLocaleString() : 'N/A'}</p>
              </CardContent>
            )}
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
