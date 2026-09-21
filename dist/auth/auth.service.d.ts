import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        id: any;
        nama: any;
        roles: import("../users/dto/user-response.dto").RoleResponseDto[];
        access_token: string;
        refresh_token: string;
        token_type: string;
        expires_in: number;
    }>;
    refreshToken(token: string): Promise<{
        id: number;
        nama: string;
        roles: import("../users/dto/user-response.dto").RoleResponseDto[];
        access_token: string;
        refresh_token: string;
        token_type: string;
        expires_in: number;
    }>;
}
