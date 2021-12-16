import { Column, Model, PrimaryKey, AutoIncrement, Table, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { markets_mkt } from '../markets/markets.entity';
import { users_usr } from '../users/users.entity';
import { carts_crt } from '../carts/carts.entity';


@Table({
	timestamps: false,
	freezeTableName: true,
})
export class customers_cus extends Model<customers_cus>
{

	@PrimaryKey
	@AutoIncrement
	@Column
	CUS_ID: number;

	@ForeignKey(() => users_usr)
	@BelongsTo(() => users_usr, { as: 'USER', foreignKey: 'USR_ID' })
	@Column
	USR_ID: number;

	@ForeignKey(() => markets_mkt)
	@BelongsTo(() => markets_mkt, { as: 'MARKET', foreignKey: 'MKT_ID' })
	@Column
	MKT_ID: number;

	@HasMany(() => carts_crt)
	CARTS: carts_crt[]
}
