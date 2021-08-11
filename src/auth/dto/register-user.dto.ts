export class RegisterUserDto {
  login: string;
  email: string;
  password: string;
}

export class RegisterUserResponse {
  token: string;
  login: string;
  email: string;
  password: string;
}
