import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(5, { error: 'Password must be at least 5 characters.' })
  .max(20, { error: 'Password must be at most 20 characters.' })
  .refine((password) => /[A-Z]/.test(password), {
    error: 'Password must contain at least one uppercase letter.',
  })
  .refine((password) => /[a-z]/.test(password), {
    error: 'Password must contain at least one lowercase letter.',
  })
  .refine((password) => /[0-9]/.test(password), {
    error: 'Password must contain at least one number.',
  })
  .refine((password) => /[!@#$%^&*(),.?":{}|<>]/.test(password), {
    error: 'Password must contain at least one special character.',
  });

const genderSchema = z.enum(['Female', 'Male', 'Other'], {
  error: 'Please select a gender',
});

const fileSchema = z
  .instanceof(File)
  .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), {
    error: 'Only .jpg, .png files are accepted.',
  })
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    error: 'File size must be less than 5MB.',
  });
export const formSchema = z
  .object({
    name: z
      .string()
      .min(2, { error: 'Name must be at least 2 characters.' })
      .refine(
        (val) => {
          if (val.length === 0) {
            return false;
          }
          val[0].toUpperCase();
        },
        {
          error: 'First letter must be uppercase.',
        }
      ),
    age: z.number().min(1, { error: 'Age must be at least 1.' }).positive(),
    email: z.string().trim().email({ error: 'Invalid email address.' }),
    password: passwordSchema,
    confirm: z.string(),
    gender: genderSchema,
    country: z.string().min(1, { error: 'Country is required.' }),
    picture: fileSchema.optional(),
    terms: z.literal(true, {
      error: 'You must accept the terms and conditions.',
    }),
  })
  .refine((data) => data.password === data.confirm, {
    error: 'Passwords do not match.',
  })
  .required();

export type FormSchemaType = z.infer<typeof formSchema>;
