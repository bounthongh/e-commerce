import { ApiProperty } from '@nestjs/swagger';


export class CreateMarketVendorDto
{

	@ApiProperty()
	readonly MKT_ID: number;

	@ApiProperty()
	readonly VDR_ID: number;
}
