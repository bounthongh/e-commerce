import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class CreateUserDto
{

	@ApiProperty()
	readonly USR_IS_ADMIN: boolean;

	@ApiProperty()
	readonly USR_IS_CUSTOMER: boolean;

	@ApiProperty()
	readonly USR_IS_VENDOR: boolean;

	@ApiProperty()
	readonly USR_LOGIN: string;

	@ApiProperty()
	readonly USR_PASSWORD: string;

	@ApiProperty()
	readonly USR_FIRST_NAME: string;

	@ApiProperty()
	readonly USR_LAST_NAME: string;

	@ApiProperty()
	readonly USR_ADDRESS: string;

	@ApiProperty()
	readonly USR_ZIP_CODE: string;

	@ApiProperty()
	readonly USR_CITY: string;

	@ApiProperty()
	readonly USR_PHONE_NUMBER: string;

	@ApiProperty()
	@ApiPropertyOptional()
	readonly VDR_NAME: string;

	@ApiProperty({ type: [Number] })
	readonly MARKET_IDS: number[];
}
