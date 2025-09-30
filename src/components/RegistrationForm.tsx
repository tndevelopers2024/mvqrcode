'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState, useTransition, useRef } from 'react';
import { Loader2, User as UserIcon, Upload } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { registerUser } from '@/app/actions';
import type { Registration } from '@/lib/types';
import { QRCodeDisplay } from './QRCodeDisplay';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  contact: z
    .string()
    .min(10, { message: 'Contact number must be at least 10 digits.' })
    .max(15, { message: 'Contact number is too long.' }),
  designation: z.string().min(2, { message: 'Please enter your designation.' }),
  city: z.string().min(2, { message: 'Please enter your city.' }),
  state: z.string().min(2, { message: 'Please enter your state.' }),
  category: z.enum(['PG', 'Delegates & State'], {
    required_error: 'Please select a category.',
  }),
  photoDataUri: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function RegistrationForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [successfulRegistration, setSuccessfulRegistration] = useState<Registration | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      contact: '',
      designation: '',
      city: '',
      state: '',
      category: undefined,
      photoDataUri: '',
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setPhotoPreview(dataUri);
        form.setValue('photoDataUri', dataUri);
      };
      reader.readAsDataURL(file);
    }
  };

  function onSubmit(values: FormData) {
    setSuccessfulRegistration(null);
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value as string);
        }
      });

      const result = await registerUser(formData);

      if (result.success && result.registration) {
        toast({
          title: 'Registration Successful!',
          description: 'Your QR code has been generated.',
        });
        setSuccessfulRegistration(result.registration);
        form.reset();
        setPhotoPreview(null);
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
        {/* Full Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact Number */}
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Enter your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Profile Photo */}
        <FormField
          control={form.control}
          name="photoDataUri"
          render={() => (
            <FormItem>
              <FormLabel>Profile Photo (Optional)</FormLabel>
              <FormControl>
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={photoPreview || undefined} alt="User photo" />
                    <AvatarFallback>
                      <UserIcon className="w-10 h-10 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <Button type="button" className='hover:bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500' variant="outline" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="mr-2 h-4 w-4 " />
                    {photoPreview ? 'Change Photo' : 'Upload Photo'}
                  </Button>
                  <Input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Designation */}
        <FormField
          control={form.control}
          name="designation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Designation</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-1 md:grid-cols-2 gap-6'>
          {/* City */}
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* State */}
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="Enter your state" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        </div>
        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PG">PG</SelectItem>
                    <SelectItem value="Delegates & State">Delegates &amp; State</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button type="submit" className="w-full  bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Register and Generate QR Code
        </Button>
      </form>
    </Form>
  );
}
