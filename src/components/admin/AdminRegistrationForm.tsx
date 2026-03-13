"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useTransition } from "react";
import { Loader2, Printer, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { adminRegisterUser } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { QRCodeDisplay } from "../QRCodeDisplay";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(6, { message: "Please enter a valid phone number." }),
  profession: z.string({
    required_error: "Please select a profession.",
  }).min(1, "Please select a profession."),
  designation: z.string().min(2, { message: "Please enter a designation." }),
  city: z.string().min(2, { message: "Please enter a city." }),
  state: z.string().min(2, { message: "Please enter a state." }),
  medicalCouncilNumber: z.string().optional(),
  generateQR: z.boolean().default(true),
});

type FormData = z.infer<typeof formSchema>;

export function AdminRegistrationForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [successData, setSuccessData] = useState<any>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      profession: "",
      designation: "",
      city: "",
      state: "",
      medicalCouncilNumber: "",
      generateQR: true,
    },
  });

  async function onSubmit(values: FormData) {
    startTransition(async () => {
      try {
        const result = await adminRegisterUser(values);
        if (result.success) {
          toast({
            title: "Registration Successful",
            description: "User has been registered successfully.",
          });
          setSuccessData(result.data);
          form.reset();
        } else {
          throw new Error(result.message || "Registration failed");
        }
      } catch (err: any) {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: err.message,
        });
      }
    });
  }

  if (successData) {
    return (
      <div className="space-y-6">
        <Card className="border-green-200 bg-green-50/30">
          <CardHeader className="flex flex-row items-center gap-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
            <div>
              <CardTitle className="text-green-800">Registration Complete</CardTitle>
              <CardDescription className="text-green-700">
                The user has been registered successfully. No email was sent.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Name:</strong> {successData.name}</p>
            <p><strong>Email:</strong> {successData.email}</p>
            <p><strong>Register No:</strong> {successData.registerNumber}</p>
          </CardContent>
        </Card>

        <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-xl border shadow-sm">
          {!successData.qrCodeImage && (
            <p className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full font-medium mb-2">
              Note: Badge without QR code
            </p>
          )}
          <QRCodeDisplay
            registration={{
              id: successData.id,
              name: successData.name,
              email: successData.email,
              profession: successData.profession,
              designation: successData.designation,
              city: successData.city,
              registrationDate: new Date().toISOString(),
              qrCodeImage: successData.qrCodeImage,
              qrCodeContent: successData.qrCodeImage ? `USER_ID:${successData.id}` : '',
              registeredByAdmin: successData.registeredByAdmin,
            }}
            forceBadge={true}
          />
        </div>

        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => setSuccessData(null)}
        >
          Register Another Person
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name */}
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

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
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
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select profession" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Organising committee">Organising committee</SelectItem>
                    <SelectItem value="Faculty">Faculty</SelectItem>
                    <SelectItem value="Delegate">Delegate</SelectItem>
                    <SelectItem value="Volunteer">Volunteer</SelectItem>
                    <SelectItem value="Pharma">Pharma</SelectItem>
                    <SelectItem value="Media">Media</SelectItem>
                    <SelectItem value="Visitor">Visitor</SelectItem>
                  </SelectContent>
                </Select>
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

          {/* Medical Council Number */}
          <FormField
            control={form.control}
            name="medicalCouncilNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medical Council Number (Optional)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Generate QR Toggle */}
        <FormField
          control={form.control}
          name="generateQR"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-slate-50/50">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Generate QR Code
                </FormLabel>
                <p className="text-sm text-muted-foreground">
                  A QR code pass will be generated for this person if checked.
                </p>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-[#5d01f2] hover:bg-[#4b01c4]" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Register User
        </Button>
      </form>
    </Form>
  );
}
