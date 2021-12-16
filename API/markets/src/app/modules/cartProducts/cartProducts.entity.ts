import { Column, Model, PrimaryKey,
	AutoIncrement, Table, HasMany, ForeignKey } from 'sequelize-typescript';
import { carts_crt } from '../carts/carts.entity';
import { products_pdt } from '../products/products.entity';


@Table({
	timestamps: false,
	freezeTableName: true,
})


export class carts_x_products_cxp extends Model<carts_x_products_cxp>
{

	@PrimaryKey
	@AutoIncrement
	@Column
	CXP_ID: number;

	@ForeignKey(() => carts_crt)
	@Column
	CRT_ID: number;

	@ForeignKey(() => products_pdt)
	@Column
	PDT_ID: number;

	@Column
	CXP_QTY: number;
}
