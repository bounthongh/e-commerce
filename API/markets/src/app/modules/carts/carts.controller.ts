import { Body, Controller, Get, Post, Put, Delete, Res, Req,
	Param, HttpStatus, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiTags, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CartsService } from './carts.service';
import { carts_crt } from './carts.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';


@ApiTags('Carts')
@Controller('carts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CartsController
{

	constructor(private readonly cartsService: CartsService) {}


	@Post()
	async create(@Req() request, @Body() CreateCartDto: CreateCartDto)
	{
		return await this.cartsService.create(request.user, CreateCartDto);
	}


	@Get()
	async findAll(@Req() request): Promise<carts_crt[]>
	{
		return await this.cartsService.findAll(request.user);
	}


	@Get('active')
	async findActive(@Req() request): Promise<carts_crt>
	{
		const cart = await this.cartsService.findActive(request.user);
		if (!cart) { throw new NotFoundException('No active Cart found'); }

		return cart;
	}


	@Get(':id')
	@ApiParam({ name: 'id', type: String })
	async findOne(@Req() request, @Param('id') id: string): Promise<carts_crt>
	{
		return await this.cartsService.findOne(request.user, +id);
	}


	@Put()
	async update(@Req() request, @Body() updateCartsDto: UpdateCartDto)
	{
		return await this.cartsService.update(request.user, updateCartsDto);
	}


	@Delete(':id')
	@ApiParam({ name: 'id', type: String })
	async remove(@Res() response, @Param('id') id: string): Promise<carts_crt>
	{
		const deletedCart = await this.cartsService.delete(+id);

		if (deletedCart === 0) { throw new NotFoundException(`Cart ${id} does not exist`); }

		return response.status(HttpStatus.OK).json({
			statusCode: 200,
			message: `Cart ${id} has been deleted`
		});
	}
}
