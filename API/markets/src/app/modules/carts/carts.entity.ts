import { Column, Model, PrimaryKey, AutoIncrement,
	Table, BelongsTo, BelongsToMany, ForeignKey, HasOne } from 'sequelize-typescript';
import { products_pdt } from '../products/products.entity';
import { carts_x_products_cxp } from '../cartProducts/cartProducts.entity';
import { bookings_bkg } from '../bookings/bookings.entity';
import { customers_cus } from '../customers/customers.entity';


@Table({
	timestamps: false,
	freezeTableName: true,
})
export class carts_crt extends Model<carts_crt>
{

	@PrimaryKey
	@AutoIncrement
	@Column
	CRT_ID: number;

	@ForeignKey(() => customers_cus)
	@BelongsTo(() => customers_cus, { as: 'CUSTOMER', foreignKey: 'CUS_ID' })
	@Column
	CUS_ID: number;

	@Column
	CRT_IS_ACTIVE: boolean;

	@Column
	CRT_CREATION_DATETIME: Date;

	@BelongsToMany(() => products_pdt, () => carts_x_products_cxp)
	PRODUCTS: products_pdt[];

	@HasOne(() => bookings_bkg)
	BOOKING: bookings_bkg
}
