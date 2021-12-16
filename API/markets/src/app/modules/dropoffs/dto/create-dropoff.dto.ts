import { ApiProperty } from '@nestjs/swagger';


export class CreateDropoffDto
{

	@ApiProperty()
	readonly DRP_ADDRESS: string;

	@ApiProperty()
	readonly DRP_ZIP_CODE: string;

	@ApiProperty()
	readonly DRP_CITY: string;
}
