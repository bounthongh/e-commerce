import { ApiProperty } from '@nestjs/swagger';


export class CreateVendorDto
{

	@ApiProperty()
	readonly USR_ID: number;

	@ApiProperty()
	readonly VDR_NAME: string;
}
