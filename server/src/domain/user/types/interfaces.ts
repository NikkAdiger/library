import { UserStatus } from "./enums";

export interface IUser {
	id: string;
	firstName?: string;
	lastName?: string;
	email: string;
	role: string;
	status: UserStatus;
}