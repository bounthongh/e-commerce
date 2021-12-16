import { ApiProperty } from '@nestjs/swagger';


export class UpdateCartProductDto
{

	@ApiProperty()
	readonly CXP_ID: number;

	@ApiProperty()
	readonly CRT_ID: number;

	@ApiProperty()
	readonly PDT_ID: number;

	@ApiProperty()
	readonly CXP_QTY: number;
}
