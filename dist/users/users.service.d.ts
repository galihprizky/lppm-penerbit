import { KnexService } from '../database/knex.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleResponseDto, UserResponseDto } from './dto/user-response.dto';
export declare class UsersService {
    private readonly knexService;
    constructor(knexService: KnexService);
    create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
    findAll(): Promise<UserResponseDto[]>;
    findById(id: number): Promise<UserResponseDto>;
    findByEmail(email: string): Promise<UserResponseDto>;
    findByEmailWithPassword(email: string): Promise<any>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto>;
    remove(id: number): Promise<{
        message: string;
    }>;
    private mapToResponseDto;
    private validateRoleIds;
    private replaceRoles;
    getRoles(query: any, userId: number): Promise<RoleResponseDto[]>;
    findRolesByUserId(userId: number): Promise<RoleResponseDto[]>;
    private getJurusan;
}
