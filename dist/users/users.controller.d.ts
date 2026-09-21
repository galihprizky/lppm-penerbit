import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
type ApiResponse<T> = {
    statusCode: number;
    message: string;
    data: T;
};
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    private replaceNulls;
    private formatResponse;
    create(createUserDto: CreateUserDto): Promise<ApiResponse<UserResponseDto>>;
    findAll(): Promise<ApiResponse<UserResponseDto[]>>;
    findByEmail(email: string): Promise<ApiResponse<UserResponseDto>>;
    findOne(id: number): Promise<ApiResponse<UserResponseDto>>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<ApiResponse<UserResponseDto>>;
    remove(id: number): Promise<ApiResponse<{
        message: string;
    }>>;
}
export {};
