import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { saltRounds } from 'src/shared/utils/constants/salt-rounds';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../models/dto/create-user.dto';
import { UpdateUserDto } from '../models/dto/update-user.dto';
import { User } from '../models/entities/user.entity';
import { UsersRepositoryInterface } from '../models/interfaces/repository.interface';

@Injectable()
export class UsersRepository implements UsersRepositoryInterface {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		try {
			const document_identifier = createUserDto.document.slice(-3);
			const salt = await bcrypt.genSalt(saltRounds);
			const hashedDocument = await bcrypt.hash(createUserDto.document, salt);

			const newUser = this.userRepository.create({
				name: createUserDto.name,
				email: createUserDto.email,
				document: hashedDocument,
				phone_number: createUserDto.phone_number,
				created_at: new Date(),
				accept_terms: createUserDto.accept_terms,
				document_identifier,
			});

			return await this.userRepository.save(newUser);
		} catch (err) {
			throw new HttpException(err.message, err.status);
		}
	}

	async update(id: string, { email, name, phone_number }: UpdateUserDto) {
		return await this.userRepository.update(id, {
			name,
			email,
			phone_number,
			updated_at: new Date(),
		});
	}

	async findAllQuery() {
		return await this.userRepository.query(
			`
                    SELECT 
                         * 
                    FROM 
                         passin.users
               `,
		);
	}

	async findAllQueryWithDocumentIdentifier(document_identifier: string) {
		const test = await this.userRepository.query(
			`
                    SELECT 
                         * 
                    FROM 
                         passin.users
                    WHERE 
                         users.document_identifier = $1
               `,
			[document_identifier],
		);

		return test;
	}

	async findNotIncludedInEvent(event_id: string) {
		return await this.userRepository.query(
			`
               SELECT 
                    u.*
               FROM 
                    passin.users AS u
               WHERE 
                    NOT EXISTS (
                    SELECT 1
                    FROM passin.attendees AS a
                    WHERE 
                         a.id_user = u.id
                         AND 
                         a.id_event = $1
                    );
               `,
			[event_id],
		);
	}

	async findOneByEmail(email: string) {
		return await this.userRepository.findOne({ where: { email } });
	}

	async findOneByPhoneNumber(phone_number: string) {
		return await this.userRepository.findOne({ where: { phone_number } });
	}

	async findOneById(id: string) {
		return await this.userRepository.findOne({ where: { id } });
	}
}
