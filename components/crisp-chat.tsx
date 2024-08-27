"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("70cfd25d-c45d-4d95-a142-1836517d3d1c");
  }, []);

  return null;
};
