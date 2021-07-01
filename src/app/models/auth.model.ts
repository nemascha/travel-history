export interface AuthModel {
  login: string;
  password: string;
}

export enum UserRoles {
  USER = 'USER',
  UNAUTHORIZED = 'UNAUTHORIZED',
}

export const Users = [
  UserRoles.USER,
];

export interface UserData {
  id?: string;
  firstName?: string;
  lastName?: string;
  role: UserRoles;
}

export const userMock: UserData = {
  id: '123-123-123',
  firstName: 'John',
  lastName: 'Doe',
  role: UserRoles.USER,
};

export const unauthorizedUserMock: UserData = {
  role: UserRoles.UNAUTHORIZED,
};
