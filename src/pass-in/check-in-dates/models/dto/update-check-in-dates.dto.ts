import { PartialType } from '@nestjs/mapped-types';
import { CreateCheckInDatesDto } from './create-check-in-dates.dto';

export class UpdateCheckInDatesDto extends PartialType(CreateCheckInDatesDto) {}
