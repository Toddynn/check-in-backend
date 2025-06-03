import { PartialType } from '@nestjs/mapped-types';
import { CreateCheckOutDatesDto } from './create-check-out-dates.dto';

export class UpdateCheckOutDatesDto extends PartialType(CreateCheckOutDatesDto) {}
