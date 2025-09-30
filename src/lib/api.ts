const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://mvcon.space/api/v1";

// ---------- Types ----------
export interface User {
  id?: string;
  name: string;
  email: string;
  phone: string;
  profession: string;
  city: string;
  state: string;
  designation: string;
  role?: "user" | "admin";
  profileImage?: string;
  qrCodeImage?: string;
  createdAt?: string;
  updatedAt?: string;
  isVerified?: boolean;
    certificateImage?: string;
  certificateFile?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  data?: any;
  token?: string;
  message?: string;
}

// ---------- Scan Types ----------
export interface ScanResponse {
  success: boolean;
  isValid: boolean;
  user: User | null;
  message: string;
}

// ---------- Logs ----------
export interface ScanLog {
  id: string;
  qrData: string;
  isValid: boolean;
  timestamp: string;
  details?: string;
  user?: User;
  scannedBy?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface AbstractSubmission {
  name: string;
  registerNo: string;
  institute: string;
  contact: string;
  email: string;
  file: File;
}

export interface Abstract {
  _id: string;
  name: string;
  registerNo: string;
  institute: string;
  contact: string;
  email: string;
  file: string;
  status: "submitted" | "under review" | "accepted" | "rejected";
  createdAt: string;
}

// ---------- Helper ----------
// ---------- Helper ----------
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || data.message || "API Error");
  }

  return data as T;
}


// ---------- Payments APIs ----------

// Step 1: Register user data (prepare only, not saved yet)
export async function prepareRegistration(
  userData: Omit<User, "id" | "role" | "isVerified"> & { profileImage?: File }
) {
  const formData = new FormData();
  Object.entries(userData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as any);
    }
  });
  return request<{ success: boolean; message: string; userData: any }>(
    "/auth/register",
    {
      method: "POST",
      body: formData,
    }
  );
}

// Step 2: Create Razorpay order
export async function createPaymentOrder(amount: number, currency = "INR") {
  return request<{ success: boolean; order: any }>("/payments/create-order", {
    method: "POST",
    body: JSON.stringify({ amount, currency }),
  });
}

// Step 3: Verify payment and finalize registration
export async function verifyPaymentAndRegister(
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string,
  userData: any,
  amount: number
) {
  return request<AuthResponse>("/payments/verify", {
    method: "POST",
    body: JSON.stringify({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userData,
      amount,
    }),
  });
}

export async function loginUser(email: string, password: string) {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function getCurrentUser() {
  return request<AuthResponse>("/auth/me", {
    method: "GET",
  });
}

export async function logoutUser() {
  return request<AuthResponse>("/auth/logout", {
    method: "GET",
  });
}

export async function updateUserDetails(details: Partial<User>) {
  return request<AuthResponse>("/auth/updatedetails", {
    method: "PUT",
    body: JSON.stringify(details),
  });
}

export async function updatePassword(
  currentPassword: string,
  newPassword: string
) {
  return request<AuthResponse>("/auth/updatepassword", {
    method: "PUT",
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}

export async function forgotPassword(email: string) {
  return request<AuthResponse>("/auth/forgotpassword", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function resetPassword(
  email: string,
  otp: string,
  newPassword: string
) {
  return request<AuthResponse>("/auth/resetpassword", {
    method: "POST",
    body: JSON.stringify({ email, otp, newPassword }),
  });
}

// ---------- User Management APIs (Admin) ----------

// Get all users (admin only)
export async function getUsers() {
  return request<{ success: boolean; count: number; data: User[] }>("/users", {
    method: "GET",
  });
}

// Create a new user (admin only)
export async function createUser(userData: User) {
  return request<{ success: boolean; data: User }>("/users", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

// Get a single user by ID
export async function getUser(id: string) {
  return request<{ success: boolean; data: User }>(`/users/${id}`, {
    method: "GET",
  });
}

// Update user by ID (admin only)
export async function updateUser(id: string, userData: Partial<User>) {
  return request<{ success: boolean; data: User }>(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(userData),
  });
}

// Delete user by ID (admin only)
export async function deleteUser(id: string) {
  return request<{ success: boolean; data: {} }>(`/users/${id}`, {
    method: "DELETE",
  });
}

// Get all normal users (role = "user")
export async function getAllUserRoleUsers() {
  const res = await getUsers(); // reuses your admin API getUsers()
  return res.data.filter((u: User) => u.role === "user");
}

// ---------- Scan APIs ----------

// Scan a QR code
export async function scanQRCode(qrData: string) {
  return request<{ success: boolean; isValid: boolean; user?: User; message: string }>(
    "/scan",
    {
      method: "POST",
      body: JSON.stringify({ qrData }),
    }
  );
}

// Get all scan logs (admin only)
export async function getScanLogs() {
  return request<{ success: boolean; count: number; data: ScanLog[] }>("/scan/logs", {
    method: "GET",
  });
}

// Get logs for a specific user (admin or that user)
export async function getUserLogs(userId: string) {
  return request<{ success: boolean; count: number; data: ScanLog[] }>(
    `/scan/logs/${userId}`,
    { method: "GET" }
  );
}

export async function submitAbstractForm(data: AbstractSubmission) {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("registerNo", data.registerNo);
  formData.append("institute", data.institute);
  formData.append("contact", data.contact);
  formData.append("email", data.email);
  formData.append("file", data.file);

  return request<{ success: boolean; message: string; data: any }>("/abstracts", {
    method: "POST",
    body: formData,
  });
}

export async function getAllAbstracts() {
  return request<{ success: boolean; data: Abstract[] }>("/abstracts", {
    method: "GET",
  }).then((res) => res.data);
}
