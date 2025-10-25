export interface ILoginRequest {
	username: string;
	password: string;
}

export interface ILoginResponse {
	access_token: string;
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

export interface ErrorResponse {
	error: string;
	message: string;
}
