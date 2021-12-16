import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { where } from 'sequelize/types';
import { carts_x_products_cxp } from './cartProducts.entity';
import { customers_cus } from '../customers/customers.entity';
import { CreateCartProductDto } from './dto/create-cartProduct.dto';
import { UpdateCartProductDto } from './dto/update-cartProduct.dto';


@Injectable()
export class CartProductsService {}
