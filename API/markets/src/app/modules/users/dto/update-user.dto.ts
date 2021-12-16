import { ApiProperty } from '@nestjs/swagger';


export class UpdateUserDto
{
	@ApiProperty()
	readonly USR_ID: number;

	@ApiProperty()
	readonly USR_IS_ADMIN: boolean;

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
}
