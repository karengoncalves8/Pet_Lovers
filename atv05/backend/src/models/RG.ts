import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Cliente } from './Cliente';

@Table({
    tableName: 'Rg',
    timestamps: true
})

export class Rg extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    Rg_id!: number;

    @Column({
        type: DataType.STRING(12),
        allowNull: false
    })
    Rg_valor!: string;

    @ForeignKey(() => Cliente)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    Cliente_id!: number;

    @BelongsTo(() => Cliente)
    Cliente!: Cliente;
}
