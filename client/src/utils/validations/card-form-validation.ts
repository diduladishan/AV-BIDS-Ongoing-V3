import * as z from 'zod';

export const CardFormSchema = z.object({
  name: z.string().min(1, 'Name is required'), // Set error message
  number: z
    .string()
    .min(16, 'Invalid card number length') // Minimum length for most cards
    .max(19, 'Invalid card number length'), // Maximum length for most cards
  expire: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiration date format (MM/YY)') // Regex for MM/YY format
    .transform((str) => {
      const [month, year] = str.split('/');
      return new Date(parseInt(year, 10) + 2000, parseInt(month, 10) - 1); // Check for future date
    })
    .refine((date) => date > new Date(), 'Card is expired'), // Ensure future date
  cvc: z.string().length(3, 'Invalid CVC code'), // Fixed length for CVC
  type: z.string(), // Specify allowed card types
});

export type CardFormValues = z.infer<typeof CardFormSchema>;
