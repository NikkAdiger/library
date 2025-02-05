import apiClient from './apiClient';

export interface IRegistrationUser {
	firstName?: string;
	lastName?: string;
	email: string;
	password: string; // Only for registration
  }

  export interface IUser {
	id: string;
	firstName?: string;
	lastName?: string;
	email: string;
	status: UserStatus;
	role: string;
  }

  export enum UserStatus {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE',
	DELETED = 'DELETED',
}

export const registration = async (registrationUser: IRegistrationUser): Promise<IUser> => {
	const response = await apiClient.post('auth/register', registrationUser);
	return response.data;
};

export const login = async (login: { email: string, password: string }): Promise<{ accessToken: string }> => {
	const response = await apiClient.post<{ accessToken: string }>('auth/login', login);
	return response.data;
};

export const profile = async (): Promise<Pick<IUser, 'id' | 'email' | 'role'>> => {
	const response = await apiClient.get('auth/profile');
	return response.data;
};
