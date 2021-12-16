import { Body, Controller, Get, Post, Put, Delete, Res, Param, HttpStatus, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiTags, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { VendorsService } from './vendors.service';
import { vendors_vdr } from './vendors.entity';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';


@ApiTags('Vendors')
@Controller('vendors')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class VendorsController
{

	constructor(private readonly vendorsService: VendorsService) {}


	@Post()
	async create(@Body() CreateVendorDto: CreateVendorDto)
	{
		return await this.vendorsService.create(CreateVendorDto);
	}


	@Get()
	async findAll(): Promise<vendors_vdr[]>
	{
		return await this.vendorsService.findAll();
	}


	@Get(':id')
	@ApiParam({ name: 'id', type: String })
	async findOne(@Param('id') id: string): Promise<vendors_vdr>
	{
		return await this.vendorsService.findOne(+id);
	}


	@Put()
	async update(@Body() updateVendorsDto: UpdateVendorDto)
	{
		return await this.vendorsService.update(updateVendorsDto);
	}


	@Delete(':id')
	@ApiParam({ name: 'id', type: String })
	async remove(@Res() response, @Param('id') id: string): Promise<vendors_vdr>
	{
		const deletedVendor = await this.vendorsService.delete(+id);

		if (deletedVendor === 0) { throw new NotFoundException(`Vendor ${id} does not exist`); }

		return response.status(HttpStatus.OK).json({
			statusCode: 200,
			message: `Vendor ${id} has been deleted`
		});
	}
}
