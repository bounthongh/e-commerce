import { ApiProperty } from '@nestjs/swagger';


export class UpdateDropoffDto
{

	@ApiProperty()
	readonly DRP_ID: number;

	@ApiProperty()
	readonly DRP_ADDRESS: string;

	@ApiProperty()
	readonly DRP_ZIP_CODE: string;

	@ApiProperty()
	readonly DRP_CITY: string;
}
