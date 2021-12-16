import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { where } from 'sequelize/types';
import { markets_x_vendors_mxv } from './marketVendors.entity';
import { customers_cus } from '../customers/customers.entity';
import { CreateMarketVendorDto } from './dto/create-marketVendor.dto';
import { UpdateMarketVendorDto } from './dto/update-marketVendor.dto';


@Injectable()
export class MarketVendorsService
{

	private readonly marketVendors: markets_x_vendors_mxv[] = [];


	constructor(
    	@Inject('MARKETVENDORS_REPOSITORY')
    	private readonly marketVendorsRepository: typeof markets_x_vendors_mxv,
	) {}


	async create(createMarketVendorDto: CreateMarketVendorDto): Promise<markets_x_vendors_mxv>
	{
		const marketVendor = await markets_x_vendors_mxv.create({
			MKT_ID: createMarketVendorDto.MKT_ID,
			VDR_ID: createMarketVendorDto.VDR_ID,
		});

		return marketVendor;
	}


	async findAll(): Promise<markets_x_vendors_mxv[]>
	{
		return this.marketVendorsRepository.findAll<markets_x_vendors_mxv>({
			include: [{ model: customers_cus }],
		});
	}


	async findOne(marketVendorId: number)
	{
		return this.marketVendorsRepository.findOne<markets_x_vendors_mxv>({
  			where: { MXV_ID: marketVendorId },
			include: [{ model: customers_cus }]
    	});
	}


	async update(updateMarketVendorDto: UpdateMarketVendorDto)
	{
		let marketVendor = await this.marketVendorsRepository.findByPk(updateMarketVendorDto.MXV_ID);

		if (!marketVendor) { throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST); }
		marketVendor = await marketVendor.update(updateMarketVendorDto);

		return marketVendor;
	}


	async delete(marketVendorId: number)
	{
		return this.marketVendorsRepository.destroy({ where: {
			MXV_ID: marketVendorId
		}});
	}
}
