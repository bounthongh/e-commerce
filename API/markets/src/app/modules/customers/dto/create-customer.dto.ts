import { ApiProperty } from '@nestjs/swagger';


export class CreateCustomerDto
{

	@ApiProperty()
	readonly USR_ID: number;

	@ApiProperty()
	readonly MKT_ID: number;
}
