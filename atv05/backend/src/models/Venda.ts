import { Table, Column, Model, DataType, HasMany, BelongsTo, ForeignKey, HasOne, CreatedAt } from 'sequelize-typescript';
import { CliEndereco } from './Endereco';
import { Rg } from './RG';
import { Pet } from './Pet';
import { Cliente } from './Cliente';
import { VendaItens } from './VendaItens';

@Table({
    tableName: 'Venda',
    timestamps: true
})

export class Venda extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    Venda_id!: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    Venda_total!: number;

    @Column({
        type: DataType.DATE, 
        field: 'venda_data', 
    })
    @CreatedAt
    Venda_data!: Date;

    @ForeignKey(() => Cliente)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    Cliente_id!: number;

    @BelongsTo(() => Cliente)
    Cliente!: Cliente;

    @HasMany(() => VendaItens)
    Venda_itens!: VendaItens[];
}
