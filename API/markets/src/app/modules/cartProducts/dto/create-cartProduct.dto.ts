import { ApiProperty } from '@nestjs/swagger';


export class CreateCartProductDto
{

	@ApiProperty()
	readonly PDT_ID: number;

	@ApiProperty()
	readonly CXP_QTY: number;
}
