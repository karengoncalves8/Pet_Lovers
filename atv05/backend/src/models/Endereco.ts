import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Cliente } from './Cliente';

@Table({
    tableName: 'CliEndereco',
    timestamps: true
})
export class CliEndereco extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    End_id!: number;

    @Column({
        type: DataType.STRING(30),
        allowNull: false
    })
    End_estado!: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    End_cidade!: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    End_bairro!: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    End_rua!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    End_numero!: number;

    @Column({
        type: DataType.STRING(10),
        allowNull: false
    })
    End_codPostal!: string;

    @Column({
        type: DataType.STRING(30),
        allowNull: true 
    })
    End_infoAdicionais?: string;

    @ForeignKey(() => Cliente)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    Cliente_id!: number;

    @BelongsTo(() => Cliente)
    Cliente!: Cliente;
}
