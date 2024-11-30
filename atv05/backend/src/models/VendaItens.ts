import { Table, Column, Model, DataType, BelongsTo, ForeignKey, BelongsToMany } from 'sequelize-typescript';
import { Venda } from './Venda';
import { Consumiveis } from './Consumiveis';
import { Pet } from './Pet';
import { VendaItensPets } from './VendaItensPets';

@Table({
    tableName: 'VendaItens',
    timestamps: true
})

export class VendaItens extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  VenItens_id!: number;

    @ForeignKey(() => Venda)
    @Column({
      type: DataType.INTEGER,
      allowNull: false
    })
    Venda_id!: number;

    @ForeignKey(() => Consumiveis)
    @Column({
      type: DataType.INTEGER,
      allowNull: false
    })
    Cons_id!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    VenItens_quantidade!: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    VenItens_total!: number;

    @BelongsTo(() => Consumiveis)
    Consumiveis!: Consumiveis;

    @BelongsTo(() => Venda)
    Venda!: Venda;

    @BelongsToMany(() => Pet, () => VendaItensPets)
    Pets!: Pet[];
}
