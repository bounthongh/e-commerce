import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class CreateBookingDto
{

	@ApiProperty()
	readonly CRT_ID: number;

	@ApiPropertyOptional()
	readonly DRP_ID: number;

	@ApiProperty()
	readonly BKG_PAID: boolean;

	@ApiProperty()
	readonly BKG_DELIVERED: boolean;

	@ApiProperty()
	readonly BKG_DELIVERY: string; // enum

	@ApiProperty()
	readonly BKG_DATETIME: Date;
}
