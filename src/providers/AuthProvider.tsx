"use client";
import { AuthServiceContext } from "@/actorService/authActorService";
import React, { FC, ReactNode } from "react";

interface IProps {
	children: ReactNode;
}

const AuthProvider: FC<IProps> = ({ children }) => {
	return <AuthServiceContext.Provider>{children}</AuthServiceContext.Provider>;
};

export default AuthProvider;
