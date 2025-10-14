export interface ILoginRequest {
	email: string;
	password: string;
}

export interface ILoginResponse {
	authToken: string;
}

export interface ISignupRequest {
	name: string;
	email: string;
	password: string;
}

export interface ISignupResponse {
	nextStep: string;
}

export interface IVerifyRequest {
	email: string;
	otp: string;
}

export interface IResetPassword {
	newPassword: string;
}
