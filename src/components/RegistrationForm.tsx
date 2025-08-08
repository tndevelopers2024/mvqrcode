'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState, useTransition } from 'react';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { registerUser } from '@/app/actions';
import type { Registration } from '@/lib/types';
import { QRCodeDisplay } from './QRCodeDisplay';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  designation: z.string().min(2, { message: 'Please enter your designation.' }),
  city: z.string().min(2, { message: 'Please enter your city.' }),
});

type FormData = z.infer<typeof formSchema>;

export function RegistrationForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [successfulRegistration, setSuccessfulRegistration] = useState<Registration | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      designation: '',
      city: '',
    },
  });

  function onSubmit(values: FormData) {
    setSuccessfulRegistration(null);
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      const result = await registerUser(formData);

      if (result.success && result.registration) {
        toast({
          title: 'Registration Successful!',
          description: 'Your QR code has been generated.',
        });
        setSuccessfulRegistration(result.registration);
        form.reset();
      } else {
        toast({
          variant: 'destructive',
          title: 'Registration Failed',
          description: result.error || 'An unexpected error occurred.',
        });
      }
    });
  }

  if (successfulRegistration) {
    return (
      <div className="flex flex-col items-center gap-6">
        <QRCodeDisplay registration={successfulRegistration} />
        <Button onClick={() => setSuccessfulRegistration(null)}>Register Another Person</Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="designation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Designation</FormLabel>
              <FormControl>
                <Input placeholder="Software Engineer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="New York" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Register and Generate QR Code
        </Button>
      </form>
    </Form>
  );
}
