import { Column, Model, PrimaryKey, AutoIncrement, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { carts_crt } from '../carts/carts.entity';


@Table({
	timestamps: false,
	freezeTableName: true,
})


export class bookings_bkg extends Model<bookings_bkg>
{

	@PrimaryKey
	@AutoIncrement
	@Column
	readonly BKG_ID: number;

	@ForeignKey(() => carts_crt)
	@BelongsTo(() => carts_crt, { as: 'CART', foreignKey: 'CRT_ID' })
	@Column
	readonly CRT_ID: number;

	@Column
	readonly DRP_ID: number;

	@Column
	readonly BKG_PAID: boolean;

	@Column
	readonly BKG_DELIVERED: boolean;

	@Column
	readonly BKG_DELIVERY: string;

	@Column
	readonly BKG_DATETIME: Date;
}
