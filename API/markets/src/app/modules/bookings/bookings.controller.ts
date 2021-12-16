import { Body, Controller, Get, Post, Put, Delete, Res, Param, HttpStatus, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiTags, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

import { CreateBookingDto } from './dto/create-bookings.dto';
import { UpdateBookingDto } from './dto/update-bookings.dto';
import { BookingsService } from './bookings.service';
import { bookings_bkg } from './bookings.entity';


@Controller('bookings')
@ApiTags('Bookings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class BookingsController
{

	constructor(private readonly bookingsService: BookingsService) {}


	@Post()
	async create(@Body() CreateBookingDto: CreateBookingDto)
	{
		return await this.bookingsService.create(CreateBookingDto);
	}


	@Get()
	async findAll(): Promise<bookings_bkg[]>
	{
		return await this.bookingsService.findAll();
	}


	@Get(':id')
	@ApiParam({ name: 'id', type: String })
	async findOne(@Param('id') id: string): Promise<bookings_bkg>
	{
		return await this.bookingsService.findOne(+id);
	}


	@Put()
	@ApiBearerAuth()
	async update(@Body() updateBookingDto: UpdateBookingDto)
	{
		return await this.bookingsService.update(updateBookingDto);
    }


	@Delete(':id')
	@ApiParam({ name: 'id', type: String })
	async remove(@Res() response, @Param('id') id: string): Promise<bookings_bkg>
	{
		const deletedBooking = await this.bookingsService.delete(+id);

		if (deletedBooking === 0) { throw new NotFoundException(`Booking ${id} does not exist`); }

		return response.status(HttpStatus.OK).json({
			statusCode: 200,
			message: `Booking ${id} has been deleted`
		});
	}
}
