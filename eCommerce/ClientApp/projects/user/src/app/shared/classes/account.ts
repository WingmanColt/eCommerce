// Products
export interface Account {
    FirstName?: string;
    LastName?: string;
    Email?: string;
    Password?: string;
    ConfirmPassword?: string;
    RememberMe: boolean;
    ErrorMessage: string;
    ReturnUrl: string;
}
