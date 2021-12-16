import { Column, Model, PrimaryKey, AutoIncrement, Table, HasMany, BelongsToMany } from 'sequelize-typescript';
import { customers_cus } from '../customers/customers.entity';
import { vendors_vdr } from '../vendors/vendors.entity';
import { markets_x_vendors_mxv } from '../marketVendors/marketVendors.entity';


@Table({
	timestamps: false,
	freezeTableName: true,
})


export class markets_mkt extends Model<markets_mkt>
{

	@PrimaryKey
	@AutoIncrement
	@Column
	MKT_ID: number;

	@Column
	MKT_NAME: string;

	@Column
	MKT_ADDRESS: string;

	@Column
	MKT_ZIP_CODE: string;

	@Column
	MKT_CITY: string;

	@HasMany(() => customers_cus)
	CUSTOMERS: customers_cus[]

	@BelongsToMany(() => vendors_vdr, () => markets_x_vendors_mxv)
	VENDORS: vendors_vdr[];
}
