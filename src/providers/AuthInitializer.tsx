"use client";
import { initializeAuth } from "@/app/store/features/authSlice";
import { useAppDispatch } from "@/app/store/hooks";
import { useEffect } from "react";

export default function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  });

  return null;
}
