import { ApiProperty } from '@nestjs/swagger';


export class UpdateMarketDto
{

	@ApiProperty()
	readonly MKT_ID: number;

	@ApiProperty()
	readonly MKT_NAME: string;

	@ApiProperty()
	readonly MKT_ADDRESS: string;

	@ApiProperty()
	readonly MKT_ZIP_CODE: string;

	@ApiProperty()
	readonly MKT_CITY: string;
}
