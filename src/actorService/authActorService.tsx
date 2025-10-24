"use client";
import { createActorContext } from "@xstate/react";
import { authMachine } from "@/machine/authMachine";

export const AuthServiceContext = createActorContext(authMachine);
