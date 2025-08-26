import type { Session, User } from "@supabase/supabase-js";
import { createContext } from "react";

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
