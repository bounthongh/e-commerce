import { ApiProperty } from '@nestjs/swagger';


export class UpdateVendorDto
{

	@ApiProperty()
	readonly VDR_ID: number;

	@ApiProperty()
	readonly USR_ID: number;

	@ApiProperty()
	readonly VDR_NAME: string;

}
