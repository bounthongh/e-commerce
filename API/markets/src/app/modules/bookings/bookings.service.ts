import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { where } from 'sequelize/types';
import { bookings_bkg } from './bookings.entity';
import { carts_crt } from '../carts/carts.entity';
import { products_pdt } from '../products/products.entity';
import { carts_x_products_cxp } from '../cartProducts/cartProducts.entity';
import { CreateBookingDto } from './dto/create-bookings.dto';
import { UpdateBookingDto } from './dto/update-bookings.dto';


@Injectable()
export class BookingsService
{

	private readonly bookings: bookings_bkg[] = [];

	constructor(
    	@Inject('BOOKINGS_REPOSITORY')
    	private readonly bookingsRepository: typeof bookings_bkg,
	) {}


	async create(createBookingDto: CreateBookingDto): Promise<bookings_bkg>
	{
		const booking = await bookings_bkg.create({
			CRT_ID: createBookingDto.CRT_ID,
			DRP_ID: createBookingDto.DRP_ID,
			BKG_PAID: createBookingDto.BKG_PAID,
			BKG_DELIVERED: createBookingDto.BKG_DELIVERED,
			BKG_DELIVERY: createBookingDto.BKG_DELIVERY,
			BKG_DATETIME: createBookingDto.BKG_DATETIME,
		});

		return booking;
	}


	async findAll(): Promise<bookings_bkg[]>
	{
		return this.bookingsRepository.findAll<bookings_bkg>({
			include: [
				{ model: carts_crt },
			],
		});
	}


	async findOne(bookingId: number)
	{
		return this.bookingsRepository.findOne<bookings_bkg>({
  			where: { BKG_ID: bookingId },
			include: [
				{ model: carts_crt },
			],
    	});
	}


	async update(updateBookingDto: UpdateBookingDto)
	{
		let booking = await this.bookingsRepository.findByPk(updateBookingDto.BKG_ID);

		if (!booking) { throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST); }
		booking = await booking.update(updateBookingDto);

		return booking;
	}


	async delete(bookingId: number)
	{
		return this.bookingsRepository.destroy({ where: {
			BKG_ID: bookingId
		}});
	}
}
