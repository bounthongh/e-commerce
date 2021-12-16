import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { where } from 'sequelize/types';
import { customers_cus } from './customers.entity';
import { markets_mkt } from '../markets/markets.entity';
import { users_usr } from '../users/users.entity';
import { carts_crt } from '../carts/carts.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';


@Injectable()
export class CustomersService
{

	private readonly customers: customers_cus[] = [];


	constructor(
    	@Inject('CUSTOMERS_REPOSITORY')
    	private readonly customersRepository: typeof customers_cus,
	) {}


	async create(createCustomerDto: CreateCustomerDto): Promise<customers_cus>
	{
		const customer = await customers_cus.create({
			USR_ID: createCustomerDto.USR_ID,
			MKT_ID: createCustomerDto.MKT_ID,
		});

		return customer;
	}


	async findAll(): Promise<customers_cus[]>
	{
		return this.customersRepository.findAll<customers_cus>({
			include: [
				{ model: markets_mkt },
				{ model: users_usr },
				{ model: carts_crt },
			],
		});
	}


	async findOne(customerId: number)
	{
		return this.customersRepository.findOne<customers_cus>({
  			where: { CUS_ID: customerId },
			include: [{ model: markets_mkt },  { model: users_usr }],
    	});
	}


	async update(updateCustomerDto: UpdateCustomerDto)
	{
		let customer = await this.customersRepository.findByPk(updateCustomerDto.CUS_ID);

		if (!customer) { throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST); }
		customer = await customer.update(updateCustomerDto);

		return customer;
	}


	async delete(customerId: number)
	{
		return this.customersRepository.destroy({ where: {
			CUS_ID: customerId
		}});
	}
}
