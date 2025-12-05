"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { setCookieAction } from "./cookie-store";
import { STORAGE_KEYS } from "@/constants";
import { generateCSRFToken } from "./csrf";
import { loginSchema } from "../(auth)/login/login.schema";


interface LoginResult {
  success: boolean;
  message?: string;
  data?: {
    access: string;
    refresh: string;
  };
}

type LoginResponseData = {
  access?: string;
  refresh?: string;
  user_id?: number;
  is_admin?: boolean;
};
