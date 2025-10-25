"use client";
import { createActorContext } from "@xstate/react";
import { authMachine } from "@/machine/authMachine";

export const AuthServiceContext = createActorContext(authMachine);
export const useAuthState = AuthServiceContext.useSelector;
export const authActor = AuthServiceContext.useActorRef;
