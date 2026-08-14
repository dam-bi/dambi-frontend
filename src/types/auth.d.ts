interface LoginForm {
  email: string;
  password: string;
}

interface SignupForm {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface SignupValidate extends SignupForm {
  confirmPassword;
}
