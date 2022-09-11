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

enum Roles {
    User = 0,
    Vendor = 1,
    Moderator = 2,
    Admin = 3
}

export interface IUser {
    FirstName?: string;
    LastName?: string;
    Email?: string;
    profileConfirmed?: string;
    PictureName?: string;

    isExternal?: boolean;
    ActivityReaded?: boolean;
    EmailNotifyEnable?: boolean;
    SignInSocialEnable?: boolean;
    Role?: Roles;
    ActivityOn?: Date;
    Points?: number;
}

