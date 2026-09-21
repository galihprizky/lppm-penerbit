import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
type ApiResponse<T> = {
    statusCode: number;
    message: string;
    data: T;
};
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    private buildResponse;
    create(createRoleDto: CreateRoleDto): Promise<ApiResponse<any>>;
    findAll(): Promise<ApiResponse<any[]>>;
    findOne(id: number): Promise<ApiResponse<any>>;
    update(id: number, updateRoleDto: UpdateRoleDto): Promise<ApiResponse<any>>;
    remove(id: number): Promise<ApiResponse<{
        message: string;
    }>>;
}
export {};
