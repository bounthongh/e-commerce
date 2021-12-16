import { Column, Model, PrimaryKey,
	AutoIncrement, Table, HasMany, ForeignKey } from 'sequelize-typescript';
import { vendors_vdr } from '../vendors/vendors.entity';
import { markets_mkt } from '../markets/markets.entity';


@Table({
	timestamps: false,
	freezeTableName: true,
})


export class markets_x_vendors_mxv extends Model<markets_x_vendors_mxv>
{

	@PrimaryKey
	@AutoIncrement
	@Column
	MXV_ID: number;

	@ForeignKey(() => markets_mkt)
	@Column
	MKT_ID: number;

	@ForeignKey(() => vendors_vdr)
	@Column
	VDR_ID: number;
}
