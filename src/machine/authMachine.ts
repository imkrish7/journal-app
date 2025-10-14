import {
	ILoginResponse,
	ILoginRequest,
	ISignupRequest,
	ISignupResponse,
	IVerifyRequest,
	IResetPassword,
} from "@/interface/auth";
import { toast } from "sonner";
import { assign, fromPromise, setup } from "xstate";

export const auth = setup({
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
			console.log(input);
			return {
				authToken: "",
			};
		}),
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
							target: "authenticate",
						},
						{
							target: "tryAuthenticate",
						},
					],
				},
				tryAcuthenticate: {
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
							target: "getUserVerifyLink",
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
							target: "validateAuthToken",
							actions: assign(({ event }) => {
								return {
									loginResponse: event.output,
								};
							}),
						},
						onError: {
							target: "tryAuthenticate",
							actions: () => {
								toast.error("Error in login");
							},
						},
					},
				},
				getUserSignup: {},
				getUserVerifyLink: {},
				getUserVerified: {},
				getUserForgotPasswordLink: {},
				getUserPasswordReset: {},
			},
		},
		authenticated: {},
	},
});
