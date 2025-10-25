import { ILoginRequest } from "@/interface/auth";

export const loginAction = async (loginRequest: ILoginRequest) => {
	try {
		const result = await fetch("/api/auth/login", {
			method: "POST",
			body: JSON.stringify(loginRequest),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!result.ok) {
			return false;
		}
		return true;
	} catch (error) {
		console.dir(error);
		return false;
	}
};
// export const signupAction = async (
// 	signupRequeset: ISignupRequest
// ): Promise<ISignupResponse> => {
// 	const result = await post("/auth/signup", signupRequeset);
// 	return result as unknown as ISignupResponse;
// };
