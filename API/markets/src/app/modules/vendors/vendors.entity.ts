import { Column, Model, PrimaryKey, AutoIncrement,
	Table, BelongsTo, BelongsToMany, ForeignKey, HasMany } from 'sequelize-typescript';
import { markets_mkt } from '../markets/markets.entity';
import { markets_x_vendors_mxv } from '../marketVendors/marketVendors.entity';
import { users_usr } from '../users/users.entity';
import { products_pdt } from '../products/products.entity';


@Table({
	timestamps: false,
	freezeTableName: true,
})
export class vendors_vdr extends Model<vendors_vdr>
{

	@PrimaryKey
	@AutoIncrement
	@Column
	VDR_ID: number;

	@ForeignKey(() => users_usr)
	@BelongsTo(() => users_usr, { as: 'USER', foreignKey: 'USR_ID' })
	@Column
	USR_ID: number;

	@Column
	VDR_NAME: string;

	@BelongsToMany(() => markets_mkt, () => markets_x_vendors_mxv)
	MARKETS: markets_mkt[];

	@HasMany(() => products_pdt)
	PRODUCTS: products_pdt[]
}
