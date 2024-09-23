import { toast } from "sonner";
import {z} from "zod"

export const loginValidator = (email: string, password: string) => {
  if (!email) {
    toast.error("Email is required");
    return false
  }
  if (!password) {
    toast.error("Password is required");
    return false
  }
  if(!validateEmail(email)){
    toast.error("Invalid email");
    return false
  }
  return true;
};

function validateEmail(email: string): boolean {
    const emailSchema = z.string().email();
    const result = emailSchema.safeParse(email);
    return result.success;
  }
