export class RegisterUserDto {
  login: string;
  telephone: number;
  email?: string;
  password: string;
}

export class RegisterUserResponse {
  token: string;
  login: string;
  email: string;
}
