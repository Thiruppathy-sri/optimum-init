"use client";

import { useRef } from "react";
import { useStore } from "../store/store";

function StoreInitializer({ users }: any) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useStore.setState({ users: users });
    initialized.current = true;
  }
  return null;
}

export default StoreInitializer;
