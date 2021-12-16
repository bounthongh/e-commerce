import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateCartProductDto } from '../../cartProducts/dto/create-cartProduct.dto';


export class CreateCartDto
{

	@ApiProperty()
	readonly CUS_ID: number;

	@ApiProperty()
	readonly CRT_IS_ACTIVE: boolean;

	@ApiPropertyOptional({ type: [CreateCartProductDto] })
	readonly PRODUCTS: CreateCartProductDto[];
}
