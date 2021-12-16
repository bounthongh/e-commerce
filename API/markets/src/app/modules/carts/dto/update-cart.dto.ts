import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateCartProductDto } from '../../cartProducts/dto/create-cartProduct.dto';


export class UpdateCartDto
{

	@ApiProperty()
	readonly CRT_ID: number;

	@ApiProperty()
	readonly CUS_ID: number;

	@ApiProperty()
	readonly CRT_IS_ACTIVE: boolean;

	@ApiProperty()
	readonly CRT_CREATION_DATETIME: Date;

	@ApiPropertyOptional({ type: [CreateCartProductDto] })
	readonly PRODUCTS: CreateCartProductDto[];
}
