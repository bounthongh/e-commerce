import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { where } from 'sequelize/types';
import { dropoff_drp } from './dropoffs.entity';
import { products_pdt } from '../products/products.entity';
import { CreateDropoffDto } from './dto/create-dropoff.dto';
import { UpdateDropoffDto } from './dto/update-dropoff.dto';


@Injectable()
export class DropoffsService
{

	private readonly dropoffs: dropoff_drp[] = [];


	constructor(
    	@Inject('DROPOFFS_REPOSITORY')
    	private readonly dropoffsRepository: typeof dropoff_drp,
	) {}


	async create(createDropoffDto: CreateDropoffDto): Promise<dropoff_drp>
	{
		const dropoffs = await dropoff_drp.create({
			DRP_ADDRESS: createDropoffDto.DRP_ADDRESS,
			DRP_ZIP_CODE: createDropoffDto.DRP_ZIP_CODE,
			DRP_CITY: createDropoffDto.DRP_CITY,
		});

		return dropoffs;
	}


	async findAll(): Promise<dropoff_drp[]>
	{
		return this.dropoffsRepository.findAll<dropoff_drp>();
	}


	async findOne(dropoffId: number)
	{
		return this.dropoffsRepository.findOne<dropoff_drp>({
			where: { DRP_ID: dropoffId },
		});
	}


	async update(updateDropoffDto: UpdateDropoffDto)
	{
		let dropoff = await this.dropoffsRepository.findByPk(updateDropoffDto.DRP_ID);

		if (!dropoff) { throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST); }
		dropoff = await dropoff.update(updateDropoffDto);

		return dropoff;
	}


	async delete(dropoffId: number)
	{
		return this.dropoffsRepository.destroy({ where: {
			DRP_ID: dropoffId
		}});
	}
}
