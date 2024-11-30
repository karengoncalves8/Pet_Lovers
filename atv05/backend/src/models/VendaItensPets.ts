import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Pet } from './Pet';
import { VendaItens } from './VendaItens';

@Table({
    tableName: 'VendaItensPets',
    timestamps: true
})

export class VendaItensPets extends Model {
    @ForeignKey(() => Pet)
    @Column({
      type: DataType.INTEGER,
      allowNull: false
    })
    Pet_id!: number;

    @ForeignKey(() => VendaItens)
    @Column({
      type: DataType.INTEGER,
      allowNull: false
    })
    VenItens_id!: number;

    @BelongsTo(() => VendaItens)
    VendaItens!: VendaItens;

    @BelongsTo(() => Pet)
    Pet!: Pet;
}
