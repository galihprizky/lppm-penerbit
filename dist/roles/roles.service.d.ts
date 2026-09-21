import { KnexService } from '../database/knex.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesService {
    private readonly knexService;
    constructor(knexService: KnexService);
    create(createRoleDto: CreateRoleDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, updateRoleDto: UpdateRoleDto): Promise<any>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
