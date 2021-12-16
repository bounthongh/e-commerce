import { Column, Model, PrimaryKey, AutoIncrement,
	Table, BelongsToMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { carts_crt } from '../carts/carts.entity';
import { vendors_vdr } from '../vendors/vendors.entity';
import { carts_x_products_cxp } from '../cartProducts/cartProducts.entity';


@Table({
	timestamps: false,
	freezeTableName: true,
})


export class products_pdt extends Model<products_pdt>
{

	@PrimaryKey
	@AutoIncrement
	@Column
	PDT_ID: number;

	@ForeignKey(() => vendors_vdr)
	@BelongsTo(() => vendors_vdr, { as: 'VENDOR', foreignKey: 'VDR_ID' })
	@Column
	VDR_ID: number;

	@Column
	PDT_NAME: string;

	@Column
	PDT_PRICE: number;

	@Column
	PDT_QUANTITY: number;

	@Column
	PDT_UNIT: string;

	@Column
	PDT_IMAGE: string;

	@BelongsToMany(() => carts_crt, () => carts_x_products_cxp)
	MARKETS: carts_crt[];
}
