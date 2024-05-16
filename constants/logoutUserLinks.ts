interface LogoutUserLink {
    label: string;
    type: "signup" | "signin";
  }

export const logoutUserLinks:LogoutUserLink[] = [
    {label: "Sign up for free", type: "signup"},
    {label: "Signin", type: "signin"}
]