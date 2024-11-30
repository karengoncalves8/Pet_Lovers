import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Cliente } from './Cliente';

@Table({
    tableName: 'Telefone',
    timestamps: true
})

export class Telefone extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    Tel_id!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    Tel_ddd!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    Tel_numero!: number;

    @ForeignKey(() => Cliente)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    Cliente_id!: number;

    @BelongsTo(() => Cliente)
    Cliente!: Cliente;
}
