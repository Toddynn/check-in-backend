import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericPagination } from 'src/shared/utils/dto/generic-pagination';
import { ILike, Repository } from 'typeorm';
import { CreateThirdPartySoftwareDto } from '../models/dto/create-third-party-software.dto';
import { UpdateThirdPartySoftwareDto } from '../models/dto/update-third-party-software.dto';
import { ThirdPartySoftwares } from '../models/entities/third-party-softwares.entity';
import { ThirdPartySoftwaresRepositoryInterface } from '../models/interfaces/repository.interface';

@Injectable()
export class ThirdPartySoftwaresRepository implements ThirdPartySoftwaresRepositoryInterface {
	constructor(
		@InjectRepository(ThirdPartySoftwares)
		private readonly thirdPartySoftwaresRepository: Repository<ThirdPartySoftwares>,
	) {}

	async create(CreateThirdPartySoftwareDto: CreateThirdPartySoftwareDto) {
		const tp_Software = this.thirdPartySoftwaresRepository.create(CreateThirdPartySoftwareDto);

		return await this.thirdPartySoftwaresRepository.save(tp_Software);
	}

	async update(id: number, updateThirdPartySoftwareDto: UpdateThirdPartySoftwareDto) {
		return await this.thirdPartySoftwaresRepository.update(id, {
			...updateThirdPartySoftwareDto,
			updated_at: new Date(),
		});
	}

	async delete(id: number) {
		return await this.thirdPartySoftwaresRepository.delete(id);
	}

	async findOne(id: number) {
		return await this.thirdPartySoftwaresRepository.findOne({
			where: {
				id,
			},
		});
	}

	async findAll({ search }: GenericPagination) {
		return await this.thirdPartySoftwaresRepository.find({
			order: { created_at: { direction: 'DESC' } },
			where: {
				name: ILike(`%${search ?? ''}%`),
			},
		});
	}
}
