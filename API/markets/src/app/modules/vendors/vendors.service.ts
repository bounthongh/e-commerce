import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { where } from 'sequelize/types';
import { vendors_vdr } from './vendors.entity';
import { markets_mkt } from '../markets/markets.entity';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';


@Injectable()
export class VendorsService
{

	private readonly vendors: vendors_vdr[] = [];


	constructor(
    	@Inject('VENDOR_REPOSITORY')
    	private readonly vendorsRepository: typeof vendors_vdr,
	) {}


	async create(createVendorDto: CreateVendorDto): Promise<vendors_vdr>
	{
		const vendors = await vendors_vdr.create({
			USR_ID: createVendorDto.USR_ID,
			VDR_NAME: createVendorDto.VDR_NAME,
		});

		return vendors;
	}


	async findAll(): Promise<vendors_vdr[]>
	{
		return this.vendorsRepository.findAll<vendors_vdr>({
			include: [
				{ model: markets_mkt },
			]
		});
	}


	async findOne(vendorId: number)
	{
		return this.vendorsRepository.findOne<vendors_vdr>({
  			where: { VDR_ID: vendorId },
			include: [
				{ model: markets_mkt },
			]
    	});
	}


	async update(updateVendorDto: UpdateVendorDto)
	{
		let vendor = await this.vendorsRepository.findByPk(updateVendorDto.VDR_ID);

		if (!vendor) { throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST); }
		vendor = await vendor.update(updateVendorDto);

		return vendor;
	}


	async delete(vendorId: number)
	{
		return this.vendorsRepository.destroy({ where: {
			VDR_ID: vendorId
		}});
	}
}
