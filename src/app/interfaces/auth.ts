export interface LoginAuth {
  readonly email:string,
  readonly password:string,
}


export interface verifyCodeAuth{
  readonly resetCode: string;
}
export interface ResetPasswordAuth{
  readonly password: string;
  readonly confirmPassword: string;
}

export interface SendMailAuth {
  readonly email: string;
}
