'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState, useTransition, useRef } from 'react';
import { Loader2, User as UserIcon, Upload } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  prepareRegistration,
  createPaymentOrder,
  verifyPaymentAndRegister
} from '@/lib/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import type { Registration } from '@/lib/types';
import { QRCodeDisplay } from './QRCodeDisplay';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(6, { message: 'Please enter a valid phone number.' }),
  profession: z.enum(['PG', 'Delegates'], {
    required_error: 'Please select your profession.'
  }),
  designation: z.string().min(2, { message: 'Please enter your designation.' }),
  city: z.string().min(2, { message: 'Please enter your city.' }),
  state: z.string().min(2, { message: 'Please enter your state.' }),
  profileImage: z.any().optional()
});

type FormData = z.infer<typeof formSchema>;

type Props = {
  onSuccess?: (data: Registration) => void;
};

export function RegistrationForm({ onSuccess }: Props) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [successfulRegistration, setSuccessfulRegistration] =
    useState<Registration | null>(null);
  const [loadingQR, setLoadingQR] = useState(false); // ⚡ Loader state
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      profession: 'PG',
      designation: '',
      city: '',
      state: '',
      profileImage: undefined
    }
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('profileImage', file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  async function onSubmit(values: FormData) {
    setSuccessfulRegistration(null);
    startTransition(async () => {
      try {
        // 1️⃣ Prepare registration data
        const prepared = await prepareRegistration(values);
        if (!prepared.success || !prepared.userData) {
          throw new Error(
            prepared.message || 'Failed to prepare registration'
          );
        }
        const userData = prepared.userData;

        // 2️⃣ Determine amount dynamically
        const amount = values.profession === 'PG' ? 1 : 1;

        // 3️⃣ Create Razorpay order
        const { order } = await createPaymentOrder(amount, 'INR');

        // 4️⃣ Open Razorpay Checkout
        const options = {
          key: 'rzp_live_RNJwQRpJiswM0W',
          amount: order.amount,
          currency: order.currency,
          name: 'Conference Registration',
          description: 'Registration Fee',
          order_id: order.id,
          handler: async (response: any) => {
            try {
              setLoadingQR(true); // ⚡ show loader while verifying
              const result = await verifyPaymentAndRegister(
                response.razorpay_order_id,
                response.razorpay_payment_id,
                response.razorpay_signature,
                userData,
                order.amount / 100
              );

              if (result.success && result.data) {
                toast({
                  title: 'Registration Successful!',
                  description:
                    'Your QR code and registration number have been generated.'
                });
                setSuccessfulRegistration(result.data);
                onSuccess?.(result.data);
                form.reset();
                setPhotoPreview(null);
              } else {
                toast({
                  variant: 'destructive',
                  title: 'Registration Failed',
                  description:
                    result.message || 'Payment verification failed.'
                });
              }
            } catch (err: any) {
              toast({
                variant: 'destructive',
                title: 'Payment Verification Failed',
                description: err.message
              });
            } finally {
              setLoadingQR(false); // ⚡ hide loader
            }
          },
          prefill: {
            name: userData.name,
            email: userData.email,
            contact: userData.phone
          },
          theme: { color: '#F97316' }
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      } catch (err: any) {
        toast({
          variant: 'destructive',
          title: 'Registration Failed',
          description: err.message
        });
      }
    });
  }

  // ⚡ Loader screen while waiting for QR
  if (loadingQR) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
        <p className="text-lg font-medium">Generating your QR Code...</p>
      </div>
    );
  }

  // ✅ Show QR Code after success
  if (successfulRegistration) {
    return (
      <div className="flex flex-col items-center gap-6">
        <QRCodeDisplay registration={successfulRegistration} />
        <Button onClick={() => setSuccessfulRegistration(null)}>
          Register Another Person
        </Button>
        <a
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          href="/login"
        >
          Login
        </a>
      </div>
    );
  }

  // 📝 Default form
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Profile Photo */}
        <FormField
          control={form.control}
          name="profileImage"
          render={() => (
            <FormItem>
              <FormLabel>Profile Photo (Optional)</FormLabel>
              <FormControl>
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={photoPreview || undefined} />
                    <AvatarFallback>
                      <UserIcon className="w-10 h-10 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
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

        {/* Profession */}
        <FormField
          control={form.control}
          name="profession"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profession</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select profession" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PG">PG </SelectItem>
                    <SelectItem value="Delegates">Delegates </SelectItem>
                  </SelectContent>
                </Select>
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

        {/* City + State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"
          disabled={isPending}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Register and Pay
        </Button>
      </form>
    </Form>
  );
}
