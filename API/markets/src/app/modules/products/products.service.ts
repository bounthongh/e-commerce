import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { where } from 'sequelize/types';
import { products_pdt } from './products.entity';
import { vendors_vdr } from '../vendors/vendors.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Injectable()
export class ProductsService
{

	private readonly product: products_pdt[] = [];


	constructor(
    	@Inject('PRODUCTS_REPOSITORY')
    	private readonly productsRepository: typeof products_pdt,
	) {}


	async create(createProductDto: CreateProductDto): Promise<products_pdt>
	{
		const product = await products_pdt.create({
        	VDR_ID: createProductDto.VDR_ID,
			PDT_NAME: createProductDto.PDT_NAME,
			PDT_PRICE: createProductDto.PDT_PRICE,
			PDT_QUANTITY: createProductDto.PDT_QUANTITY,
			PDT_UNIT: createProductDto.PDT_UNIT,
			PDT_IMAGE: createProductDto.PDT_IMAGE,
		});

		return product;
	}

	async findAll(): Promise<products_pdt[]>
	{
		return this.productsRepository.findAll<products_pdt>({
			include: [
				{ model: vendors_vdr },
			],
		});
	}


	async findOne(productId: number)
	{
		return this.productsRepository.findOne<products_pdt>({
  			where: { PDT_ID: productId },
			include: [
				{ model: vendors_vdr },
			],
    	});
	}


	async update(updateProductDto: UpdateProductDto)
	{
		let product = await this.productsRepository.findByPk(updateProductDto.PDT_ID);

		if (!product) { throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST); }
		product = await product.update(updateProductDto);

		return product;
	}


	async delete(productID: number)
	{
		return this.productsRepository.destroy({ where: {
			PDT_ID: productID
		}});
	}
}
