import { Column, Model, PrimaryKey, AutoIncrement,
	Table, BelongsTo, BelongsToMany, ForeignKey, HasOne } from 'sequelize-typescript';


@Table({
	timestamps: false,
	freezeTableName: true,
})
export class dropoff_drp extends Model<dropoff_drp>
{

	@PrimaryKey
	@AutoIncrement
	@Column
	DRP_ID: number;

	@Column
	DRP_ADDRESS: string;

	@Column
	DRP_ZIP_CODE: string;

	@Column
	DRP_CITY: string;
}
