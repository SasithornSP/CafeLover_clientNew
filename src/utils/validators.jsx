import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email("Email ไม่ถูกต้อง"),
    firstName: z.string().min(3, "Firstname ต้องมากกว่า 3 "),
    lastName: z.string().min(3, "Lastname ต้องมากกว่า 3 "),
    mobile: z.string().min(10, "Phone number 10 ตัว"),
    password: z.string().min(6, "Password ต้องมากกว่า 6 "),
    confirmpassword: z.string().min(6, "confirmPassword ต้องมากกว่า 6 "),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "password incorrect",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Email ไม่ถูกต้อง"),
  password: z.string().min(6, "Password ต้องมากกว่า 6 "),
});

export const updateUserSchema =z.object({
  email: z.string().email("Email ไม่ถูกต้อง"),
  firstName: z.string().min(3, "Firstname ต้องมากกว่า 3 "),
  lastName: z.string().min(3, "Lastname ต้องมากกว่า 3 "),
  mobile: z.string().min(10, "Phone number 10 ตัว"),
  password: z.string().min(6, "Password ต้องมากกว่า 6 "),
})
