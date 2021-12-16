import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBookingDto
{
	@ApiProperty()
	readonly BKG_ID: number;

	@ApiProperty()
	readonly CRT_ID: number;

	@ApiPropertyOptional()
	readonly DRP_ID: number;

	@ApiProperty()
	readonly BKG_PAID: boolean;

	@ApiProperty()
	readonly BKG_DELIVERED: boolean;

	@ApiProperty()
	readonly BKG_DELIVERY: string;

	@ApiProperty()
	readonly BKG_DATETIME: Date;
}
