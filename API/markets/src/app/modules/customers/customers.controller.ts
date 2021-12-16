import { Body, Controller, Get, Post, Put, Delete, Res, Param, HttpStatus, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiTags, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CustomersService } from './customers.service';
import { customers_cus } from './customers.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';


@ApiTags('Customers')
@Controller('customers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CustomersController
{

	constructor(private readonly customersService: CustomersService) {}


	@Post()
	async create(@Body() CreateCustomerDto: CreateCustomerDto)
	{
		return await this.customersService.create(CreateCustomerDto);
	}


	@Put()
	async update(@Body() updateCustomersDto: UpdateCustomerDto)
	{
		return await this.customersService.update(updateCustomersDto);
    }


	@Get()
	async findAll(): Promise<customers_cus[]>
	{
		return await this.customersService.findAll();
	}


	@Get(':id')
	@ApiParam({ name: 'id', type: String })
	async findOne(@Param('id') id: string): Promise<customers_cus>
	{
		return await this.customersService.findOne(+id);
	}


	@Delete(':id')
	@ApiParam({ name: 'id', type: String })
	async remove(@Res() response, @Param('id') id: string): Promise<customers_cus>
	{
		const deletedCustomer = await this.customersService.delete(+id);

		if (deletedCustomer === 0) { throw new NotFoundException(`Customer ${id} does not exist`); }

		return response.status(HttpStatus.OK).json({
			statusCode: 200,
			message: `Customer ${id} has been deleted`
		});
	}
}
