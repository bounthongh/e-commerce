import { Column, Model, PrimaryKey, Table, ForeignKey, HasOne, AutoIncrement } from 'sequelize-typescript';
import { customers_cus } from '../customers/customers.entity';
import { vendors_vdr } from '../vendors/vendors.entity';


@Table({
  timestamps: false,
  freezeTableName: true,
})


export class users_usr extends Model<users_usr>
{

	@PrimaryKey
	@AutoIncrement
	@Column
	USR_ID: number;

	@Column
	USR_IS_ADMIN: boolean;

	@Column
	USR_LOGIN: string;

	@Column
	USR_PASSWORD: string;

	@Column
	USR_FIRST_NAME: string;

	@Column
	USR_LAST_NAME: string;

	@Column
	USR_ADDRESS: string;

	@Column
	USR_ZIP_CODE: string;

	@Column
	USR_CITY: string;

	@Column
	USR_PHONE_NUMBER: string;

	@HasOne(() => customers_cus)
	CUSTOMER: customers_cus

	@HasOne(() => vendors_vdr)
	VENDOR: vendors_vdr
}
