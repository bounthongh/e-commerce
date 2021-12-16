import { Body, Controller, Get, Post, Put, Delete, Res, Param, HttpStatus, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiTags, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProductsService } from './products.service';
import { products_pdt } from './products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@ApiTags('Products')
@Controller('products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ProductsController
{

	constructor(private readonly productsService: ProductsService) {}


	@Post()
	async create(@Body() createProductDto: CreateProductDto)
	{
	    return await this.productsService.create(createProductDto);
	}

	@Get()
	async findAll(): Promise<products_pdt[]>
	{
		return await this.productsService.findAll();
	}


	@Get(':id')
	@ApiParam({ name: 'id', type: String })
	async findOne(@Param('id') id: string): Promise<products_pdt>
	{
		return await this.productsService.findOne(+id);
	}


	@Put()
	async update(@Body() updateProductDto: UpdateProductDto)
	{
		return await this.productsService.update(updateProductDto);
    }


	@Delete(':id')
	@ApiParam({ name: 'id', type: String })
	async remove(@Res() response, @Param('id') id: string): Promise<products_pdt>
	{
		const deletedProduct = await this.productsService.delete(+id);

		if (deletedProduct === 0) { throw new NotFoundException(`Product ${id} does not exist`); }

		return response.status(HttpStatus.OK).json({
			statusCode: 200,
			message: `Product ${id} has been deleted`
		});
	}
}
