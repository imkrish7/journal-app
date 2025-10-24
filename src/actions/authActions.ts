import { post } from "@/api/method";
import {
	ILoginRequest,
	ILoginResponse,
	ISignupRequest,
	ISignupResponse,
} from "@/interface/auth";

export const loginAction = async (
	loginRequeset: ILoginRequest
): Promise<ILoginResponse> => {
	const result = await post("/login", loginRequeset);
	return result as unknown as ILoginResponse;
};
export const signupAction = async (
	signupRequeset: ISignupRequest
): Promise<ISignupResponse> => {
	const result = await post("/signup", signupRequeset);
	return result as unknown as ISignupResponse;
};
