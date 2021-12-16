import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { where } from 'sequelize/types';
import { markets_mkt } from './markets.entity';
import { customers_cus } from '../customers/customers.entity';
import { vendors_vdr } from '../vendors/vendors.entity';
import { CreateMarketDto } from './dto/create-market.dto';
import { UpdateMarketDto } from './dto/update-market.dto';


@Injectable()
export class MarketsService
{

	private readonly markets: markets_mkt[] = [];


	constructor(
    	@Inject('MARKETS_REPOSITORY')
    	private readonly marketsRepository: typeof markets_mkt,
	) {}


	async create(createMarketDto: CreateMarketDto): Promise<markets_mkt>
	{
		const market = await markets_mkt.create({
			MKT_NAME: createMarketDto.MKT_NAME,
			MKT_ADDRESS: createMarketDto.MKT_ADDRESS,
			MKT_ZIP_CODE: createMarketDto.MKT_ZIP_CODE,
			MKT_CITY: createMarketDto.MKT_CITY,
		});

		return market;
	}


	async findAll(): Promise<markets_mkt[]>
	{
		return this.marketsRepository.findAll<markets_mkt>({
			include: [
				{ model: customers_cus },
				{ model: vendors_vdr },
			]
		});
	}


	async findOne(marketId: number)
	{
		return this.marketsRepository.findOne<markets_mkt>({
  			where: { MKT_ID: marketId },
			include: [
				{ model: customers_cus },
				{ model: vendors_vdr },
			]
    	});
	}


	async update(updateMarketDto: UpdateMarketDto)
	{
		let market = await this.marketsRepository.findByPk(updateMarketDto.MKT_ID);

		if (!market) { throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST); }
		market = await market.update(updateMarketDto);

		return market;
	}


	async delete(marketId: number)
	{
		return this.marketsRepository.destroy({ where: {
			MKT_ID: marketId
		}});
	}
}
