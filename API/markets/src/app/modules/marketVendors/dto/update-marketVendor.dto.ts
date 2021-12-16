import { ApiProperty } from '@nestjs/swagger';


export class UpdateMarketVendorDto
{

	@ApiProperty()
	readonly MXV_ID: number;

	@ApiProperty()
	readonly MKT_ID: number;

	@ApiProperty()
	readonly VDR_ID: number;
}
