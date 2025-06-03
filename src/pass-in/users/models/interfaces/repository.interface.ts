import { UpdateResult } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export interface UsersRepositoryInterface {
	create(createUserDto: CreateUserDto): Promise<User>;
	findAllQuery(): Promise<User[]>;
	findAllQueryWithDocumentIdentifier(document_identifier: string): Promise<User[]>;
	findNotIncludedInEvent(event_id: string): Promise<User[]>;
	findOneByEmail(email: string): Promise<User>;
	findOneByPhoneNumber(phone_number: string): Promise<User>;
	findOneById(id: string): Promise<User>;
	update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult>;
}
