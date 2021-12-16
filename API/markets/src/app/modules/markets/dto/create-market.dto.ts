import { ApiProperty } from '@nestjs/swagger';


export class CreateMarketDto
{

	@ApiProperty()
	readonly MKT_NAME: string;

	@ApiProperty()
	readonly MKT_ADDRESS: string;

	@ApiProperty()
	readonly MKT_ZIP_CODE: string;

	@ApiProperty()
	readonly MKT_CITY: string;
}
