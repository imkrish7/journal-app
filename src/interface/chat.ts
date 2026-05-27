import { IEvent } from "./todo";

export type MessageRole = "USER" | "AI" | string;
export const SSE_DATA_PREFIX = "data: " as const;
export const SSE_DONE_MESSAGE = "[DONE]" as const;
export const SSE_LINE_DELIMETER = "\n\n" as const;

export interface IMessage {
	role: MessageRole;
	content: string;
}

export interface IChatBodyRequest {
	content: string;
}

export enum IStreamMessageType {
	Token = "token",
	Error = "error",
	Connected = "connected",
	Interrupt = "interrupt",
	Done = "done",
	ToolStart = "tool_start",
	ToolEnd = "tool_end",
	Event = "event",
}

export interface IBaseStreamMessage {
	type: IStreamMessageType;
}

export interface ITokenMessage extends IBaseStreamMessage {
	type: IStreamMessageType.Token;
	token: string;
}

export interface IInterrruptMessage extends IBaseStreamMessage {
	type: IStreamMessageType.Interrupt;
	question: string;
}

export interface IErrorMessage extends IBaseStreamMessage {
	type: IStreamMessageType.Error;
	error: string;
}

export interface IConnectedMessage extends IBaseStreamMessage {
	type: IStreamMessageType.Connected;
}

export interface IDoneMessage extends IBaseStreamMessage {
	type: IStreamMessageType.Done;
}

export interface IToolStartMessage extends IBaseStreamMessage {
	type: IStreamMessageType.ToolStart;
	input: string;
	tool: string;
}

export interface IToolEndMessage extends IBaseStreamMessage {
	type: IStreamMessageType.ToolEnd;
	tool: string;
	output: unknown;
}

export interface IChatEvent extends IBaseStreamMessage {
	type: IStreamMessageType.Event;
	data: {
		event: IEvent;
	};
}

export interface IMessage {
	_id: string;
	content: string;
	role: "USER" | "AI" | string;
	createdAt: number;
	userAvatarLink: string | undefined;
	type: "ERROR" | "VALID" | string;
	event: IEvent | null;
}

export type IStreamMessage =
	| ITokenMessage
	| IErrorMessage
	| IConnectedMessage
	| IDoneMessage
	| IToolStartMessage
	| IToolEndMessage
	| IInterrruptMessage
	| IChatEvent;
