import { GenericPagination } from 'src/shared/utils/dto/generic-pagination';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateThirdPartySoftwareDto } from '../dto/create-third-party-software.dto';
import { UpdateThirdPartySoftwareDto } from '../dto/update-third-party-software.dto';
import { ThirdPartySoftwares } from '../entities/third-party-softwares.entity';

export interface ThirdPartySoftwaresRepositoryInterface {
	create(createThirdPartySoftwareDto: CreateThirdPartySoftwareDto): Promise<ThirdPartySoftwares>;
	update(id: number, updateThirdPartySoftwareDto: UpdateThirdPartySoftwareDto): Promise<UpdateResult>;
	delete(id: number): Promise<DeleteResult>;
	findOne(id: number): Promise<ThirdPartySoftwares>;
	findAll({ search }: GenericPagination): Promise<ThirdPartySoftwares[]>;
}
