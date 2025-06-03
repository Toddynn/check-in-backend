import { PartialType } from '@nestjs/swagger';
import { CreateThirdPartySoftwareDto } from './create-third-party-software.dto';

export class UpdateThirdPartySoftwareDto extends PartialType(CreateThirdPartySoftwareDto) {}
