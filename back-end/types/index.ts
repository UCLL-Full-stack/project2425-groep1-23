type UserInput = {
  id?: number;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  assignments: Assignment[];
  progresses: Progress[];
};

type AuthenticationResponse = {
  token: string;
  username: string;
  fullname: string;
};

export { UserInput, AuthenticationResponse };