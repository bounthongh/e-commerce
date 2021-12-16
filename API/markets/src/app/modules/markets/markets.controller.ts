import { Body, Controller, Get, Post, Put, Delete, Res,
	Param, HttpStatus, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiTags, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateMarketDto } from './dto/create-market.dto';
import { UpdateMarketDto } from './dto/update-market.dto';
import { MarketsService } from './markets.service';
import { markets_mkt } from './markets.entity';


@Controller('markets')
@ApiTags('Markets')
@Roles('ADMIN')
export class MarketsController
{

	constructor(private readonly marketsService: MarketsService) {}


	@Post()
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard, RolesGuard)
	async create(@Body() createMarketDto: CreateMarketDto)
	{
		return await this.marketsService.create(createMarketDto);
	}


	@Get()
	async findAll(): Promise<markets_mkt[]>
	{
		return await this.marketsService.findAll();
	}


	@Get(':id')
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@ApiParam({ name: 'id', type: String })
	async findOne(@Param('id') id: string): Promise<markets_mkt>
	{
		return await this.marketsService.findOne(+id);
	}


	@Put()
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard, RolesGuard)
	async update(@Body() updateMarketDto: UpdateMarketDto)
	{
		return await this.marketsService.update(updateMarketDto);
    }


	@Delete(':id')
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiParam({ name: 'id', type: String })
	async remove(@Res() response, @Param('id') id: string): Promise<markets_mkt>
	{
		const deletedMarket = await this.marketsService.delete(+id);

		if (deletedMarket === 0) { throw new NotFoundException(`Market ${id} does not exist`); }

		return response.status(HttpStatus.OK).json({
			statusCode: 200,
			message: `Market ${id} has been deleted`
		});
	}
}
