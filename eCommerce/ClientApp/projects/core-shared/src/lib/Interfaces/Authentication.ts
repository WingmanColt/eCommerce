export interface UserForAuthenticationDto {
    email: string;
    password: string;
}
export interface AuthResponseDto {
    isAuthSuccessful: boolean;
    errorMessage: string;
    token: string;
}