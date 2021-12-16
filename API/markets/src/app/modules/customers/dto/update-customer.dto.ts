import { ApiProperty } from '@nestjs/swagger';


export class UpdateCustomerDto
{

	@ApiProperty()
	readonly CUS_ID: number;

	@ApiProperty()
	readonly USR_ID: number;

	@ApiProperty()
	readonly MKT_ID: number;

}
