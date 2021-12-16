import { Body, Controller, Get, Post, Put, Delete, Res, Param, HttpStatus, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiTags, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DropoffsService } from './dropoffs.service';
import { dropoff_drp } from './dropoffs.entity';
import { CreateDropoffDto } from './dto/create-dropoff.dto';
import { UpdateDropoffDto } from './dto/update-dropoff.dto';


@ApiTags('Dropoffs')
@Controller('dropoffs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class DropoffsController
{

	constructor(private readonly dropoffsService: DropoffsService) {}


	@Post()
	async create(@Body() CreateDropoffDto: CreateDropoffDto)
	{
		return await this.dropoffsService.create(CreateDropoffDto);
	}


	@Get()
	async findAll(): Promise<dropoff_drp[]>
	{
		return await this.dropoffsService.findAll();
	}


	@Get(':id')
	@ApiParam({ name: 'id', type: String })
	async findOne(@Param('id') id: string): Promise<dropoff_drp>
	{
		return await this.dropoffsService.findOne(+id);
	}


	@Put()
	async update(@Body() updateDropoffsDto: UpdateDropoffDto)
	{
		return await this.dropoffsService.update(updateDropoffsDto);
	}


	@Delete(':id')
	@ApiParam({ name: 'id', type: String })
	async remove(@Res() response, @Param('id') id: string): Promise<dropoff_drp>
	{
		const deletedDropoff = await this.dropoffsService.delete(+id);

		if (deletedDropoff === 0) { throw new NotFoundException(`Dropoff ${id} does not exist`); }

		return response.status(HttpStatus.OK).json({
			statusCode: 200,
			message: `Dropoff ${id} has been deleted`
		});
	}
}
