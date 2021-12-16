import { HttpException, HttpStatus, Inject, Injectable,
	ForbiddenException, BadRequestException } from '@nestjs/common';
import { where } from 'sequelize/types';
import { carts_crt } from './carts.entity';
import { products_pdt } from '../products/products.entity';
import { ProductsService } from '../products/products.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';


@Injectable()
export class CartsService
{

	private readonly carts: carts_crt[] = [];


	constructor(
    	@Inject('CARTS_REPOSITORY')
		private readonly cartsRepository: typeof carts_crt,
    	private productsService: ProductsService,
	) {}


	async create(user: any, createCartDto: CreateCartDto): Promise<carts_crt>
	{
		if (user.customerId !== createCartDto.CUS_ID)
		{
			throw new ForbiddenException();
		}

		const cart = carts_crt.create({
			CUS_ID: createCartDto.CUS_ID,
			CRT_IS_ACTIVE: createCartDto.CRT_IS_ACTIVE,
			CRT_CREATION_DATETIME: new Date(),
		}).then((cart) =>
		{
			if (createCartDto.PRODUCTS)
			{
				createCartDto.PRODUCTS.forEach((productDto) =>
				{
					if (!productDto.PDT_ID) { throw new BadRequestException('Product Id is required'); }

					this.productsService.findOne(productDto.PDT_ID).then((product) =>
					{
						if (product.PDT_QUANTITY < productDto.CXP_QTY) { return; }
						cart.setPRODUCTS([product], { through: { CXP_QTY: productDto.CXP_QTY } });
					});
				});
			}

			return cart;
		});

		return cart;
	}


	async findAll(user: any): Promise<carts_crt[]>
	{
		return this.cartsRepository.findAll<carts_crt>({
			include: [
				{
					model: products_pdt,
					through:{
						attributes: ['CXP_QTY'],
					}
				},
			],
			where: user.isAdmin ? null : { CUS_ID: user.customerId },
		});
	}


	async findActive(user: any): Promise<carts_crt>
	{
		return this.cartsRepository.findOne<carts_crt>({
			include: [
				{
					model: products_pdt,
					through:{
						attributes: ['CXP_QTY'],
					}
				},
			],
			where: {
				CUS_ID: user.customerId,
				CRT_IS_ACTIVE: true,
			},
		});
	}


	async findOne(user: any, cartId: number)
	{
		const cart = await this.cartsRepository.findOne<carts_crt>({
			include: [
				{
					model: products_pdt,
					through:{
						attributes: ['CXP_QTY'],
					}
				},
			],
			where: { CRT_ID: cartId },
		});

		if (!user.isAdmin && cart.CUS_ID !== user.customerId)
		{
			throw new ForbiddenException();
		}

		return cart;
	}


	async update(user: any, updateCartDto: UpdateCartDto)
	{
		if (user.customerId !== updateCartDto.CUS_ID) { throw new ForbiddenException(); }
		let cart = await this.cartsRepository.findByPk(updateCartDto.CRT_ID);
		if (!cart) { throw new BadRequestException(); }

		cart = cart.update(updateCartDto).then((updatedCart) =>
		{
			if (updateCartDto.PRODUCTS)
			{
				updatedCart.setPRODUCTS([]); // clearing junctions

				updateCartDto.PRODUCTS.forEach((productDto) =>
				{
					if (!productDto.PDT_ID) { throw new BadRequestException('Product Id is required'); }

					this.productsService.findOne(productDto.PDT_ID).then((product) =>
					{
						updatedCart.addPRODUCTS([product], { through: { CXP_QTY: productDto.CXP_QTY } });
					});
				});
			}

			return updatedCart;
		});

		return cart;
	}


	async delete(cartId: number)
	{
		return this.cartsRepository.destroy({ where: {
			CRT_ID: cartId
		}});
	}
}
