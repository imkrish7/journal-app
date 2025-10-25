import { loginAction } from "@/actions/authActions";
import {
	ILoginResponse,
	ILoginRequest,
	ISignupRequest,
	ISignupResponse,
	IVerifyRequest,
	IResetPassword,
} from "@/interface/auth";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { assign, fromPromise, setup } from "xstate";

export const authMachine = setup({
	types: {
		context: {} as {
			loginRequest: ILoginRequest | null;
			loginResponse: ILoginResponse | null;
			signupRequest: ISignupRequest | null;
			signupResponse: ISignupResponse | null;
			verifyRequest: IVerifyRequest | null;
			resetPassword: IResetPassword | null;
			authenticated: boolean;
			email: string | null;
		},

		events: {} as
			| {
					type: "login.submit";
					loginRequest: ILoginRequest;
			  }
			| {
					type: "signup.submit";
					signupRequest: ISignupRequest;
			  }
			| {
					type: "verify.submit";
					verifyRequest: IVerifyRequest;
			  }
			| {
					type: "verify.sendLink";
					email: string;
			  }
			| {
					type: "forgotPassword.sendLink";
					email: string;
			  }
			| {
					type: "forgotPassword.resetPassword";
					resetPassword: IResetPassword;
			  },
	},
	actors: {
		login: fromPromise(async ({ input }: { input: ILoginRequest }) => {
			const response = await loginAction(input);
			return response;
		}),
		authenticateToken: fromPromise(async () => {
			return {
				authToken: "",
			};
		}),
		signup: fromPromise(async ({ input }: { input: ISignupRequest }) => {
			console.log(input);
			return {};
		}),
		sendVerifyEmail: fromPromise(async ({ input }: { input: string }) => {
			console.log(input);
			return {};
		}),
		verifyUser: fromPromise(async ({ input }: { input: IVerifyRequest }) => {
			console.log(input);
			return {};
		}),
		sendUserForgotPasswordLink: fromPromise(
			async ({ input }: { input: string }) => {
				console.log(input);
				return {};
			}
		),
		getUserPasswordReset: fromPromise(
			async ({ input }: { input: IResetPassword }) => {
				console.log(input);
				return {};
			}
		),
	},
	guards: {
		hasAuthToken: () => {
			const authToken = localStorage.getItem("JOURNAL_AUTH");
			if (authToken && authToken.length > 0) {
				return true;
			}
			return false;
		},
	},
}).createMachine({
	id: "authentication",
	context: {
		loginRequest: null,
		loginResponse: null,
		signupRequest: null,
		signupResponse: null,
		verifyRequest: null,
		resetPassword: null,
		authenticated: false,
		email: null,
	},
	initial: "unauthorized",
	states: {
		unauthorized: {
			initial: "checkAuth",
			states: {
				checkAuth: {
					always: [
						{
							guard: "hasAuthToken",
							target: "validateAuthToken",
						},
						{
							target: "tryAuthenticate",
						},
					],
				},
				tryAuthenticate: {
					on: {
						"login.submit": {
							target: "getUserLoggedin",
							actions: assign(({ event }) => {
								return {
									loginRequest: event.loginRequest,
								};
							}),
						},
						"signup.submit": {
							target: "getUserSignup",
							actions: assign(({ event }) => {
								return {
									signupRequest: event.signupRequest,
								};
							}),
						},
						"verify.sendLink": {
							target: "getUserVerifyEmail",
							actions: assign(({ event }) => {
								return {
									email: event.email,
								};
							}),
						},
						"verify.submit": {
							target: "getUserVerified",
							actions: assign(({ event }) => {
								return {
									verifyRequest: event.verifyRequest,
								};
							}),
						},
						"forgotPassword.sendLink": {
							target: "getUserForgotPasswordLink",
							actions: assign(({ event }) => {
								return {
									email: event.email,
								};
							}),
						},
						"forgotPassword.resetPassword": {
							target: "getUserPasswordReset",
							actions: assign(({ event }) => {
								return {
									resetPassword: event.resetPassword,
								};
							}),
						},
					},
				},
				getUserLoggedin: {
					invoke: {
						src: "login",
						input: ({ context }) => {
							if (!context.loginRequest) {
								throw new Error("Bad request!");
							}

							return context.loginRequest;
						},
						onDone: {
							target: "#authentication.authenticated",
							actions: assign(({ event }) => {
								localStorage.setItem("JOURNAL_AUTH", event.output.access_token);
								return {
									loginResponse: event.output,
									authenticated: true,
								};
							}),
						},
						onError: {
							target: "tryAuthenticate",
							actions: ({ event }) => {
								if (event.error instanceof AxiosError) {
									toast.error(event.error.response?.data.message);
								} else {
									toast.error("Error in login");
								}
							},
						},
					},
				},
				validateAuthToken: {
					invoke: {
						src: "authenticateToken",
						input: () => {
							const token = localStorage.getItem("JOURNAL_AUTH");
							if (!token) {
								toast.error("Invalid request!");
							}
						},
						onDone: {
							target: "#authentication.authenticated",
							actions: ({ event }) => {
								localStorage.setItem("JOURNAL_AUTH", event.output.authToken);
							},
						},
						onError: {
							target: "gotoLogin",
							actions: () => {
								toast.error("Unauthorized!");
							},
						},
					},
				},
				getUserSignup: {
					invoke: {
						src: "signup",
						input: ({ context }) => {
							if (!context.signupRequest) {
								throw new Error("Unauthorized");
							}
							return context.signupRequest;
						},
						onDone: {
							target: "gotoVerify",
							actions: () => {
								toast.success("Signup Completed!");
							},
						},
						onError: {
							target: "tryAuthenticate",
							actions: () => {
								toast.error("Signup failed");
							},
						},
					},
				},
				getUserVerifyEmail: {
					invoke: {
						src: "sendVerifyEmail",
						input: ({ context }) => {
							if (!context.email) {
								throw new Error("Bad request");
							}
							return context.email;
						},
						onDone: {
							target: "gotoVerify",
							actions: () => {
								toast.success(
									"Verification otp sent to your registered email!"
								);
							},
						},
						onError: {
							target: "tryAuthenticate",
							actions: () => {
								toast.error("Failed to send verification email");
							},
						},
					},
				},
				getUserVerified: {
					invoke: {
						src: "verifyUser",
						input: ({ context }) => {
							if (!context.verifyRequest) {
								throw new Error("Bad request!");
							}
							return context.verifyRequest;
						},
						onDone: {
							target: "gotoLogin",
							actions: () => {
								toast.success("Your account is now verified now!");
							},
						},
						onError: {
							target: "gotoVerify",
							actions: () => {
								toast.error("Account verification failed!");
							},
						},
					},
				},
				getUserForgotPasswordLink: {
					invoke: {
						src: "sendUserForgotPasswordLink",
						input: ({ context }) => {
							if (!context.email) {
								throw new Error("Bad request!");
							}
							return context.email;
						},
						onDone: {
							target: "gotoForgotPasswordLink",
							actions: () => {
								toast.success("Reset password link has been sent!");
							},
						},
						onError: {
							target: "gotoForgotPasswordLink",
							actions: () => {
								toast.error("Failed to send forgot password link");
							},
						},
					},
				},
				getUserPasswordReset: {
					invoke: {
						src: "getUserPasswordReset",
						input: ({ context }) => {
							if (!context.resetPassword) {
								throw new Error("Bad request!");
							}

							return context.resetPassword;
						},
						onDone: {
							target: "gotoLogin",
							actions: () => {
								toast.success("Your password has been reset");
							},
						},
						onError: {
							target: "gotoResetPassword",
							actions: () => {
								toast.error("Failed to reset password!");
							},
						},
					},
				},
				gotoLogin: {},
				gotoVerify: {},
				gotoResetPassword: {},
				gotoForgotPasswordLink: {},
			},
		},
		authenticated: {},
	},
});
