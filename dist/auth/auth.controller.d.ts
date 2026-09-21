import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        id: any;
        nama: any;
        roles: import("../users/dto/user-response.dto").RoleResponseDto[];
        access_token: string;
        refresh_token: string;
        token_type: string;
        expires_in: number;
    }>;
    refresh(refreshToken: string): Promise<{
        id: number;
        nama: string;
        roles: import("../users/dto/user-response.dto").RoleResponseDto[];
        access_token: string;
        refresh_token: string;
        token_type: string;
        expires_in: number;
    }>;
}
