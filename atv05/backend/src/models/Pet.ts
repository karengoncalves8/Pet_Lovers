import { Table, Column, Model, DataType, BelongsTo, ForeignKey, BelongsToMany } from 'sequelize-typescript';
import { Cliente } from './Cliente';
import { VendaItens } from './VendaItens';
import { VendaItensPets } from './VendaItensPets';

@Table({
    tableName: 'Pet',
    timestamps: true
})

export class Pet extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    Pet_id!: number;

    @Column({
        type: DataType.STRING(80),
        allowNull: false
    })
    Pet_nome!: string;

    @Column({
        type: DataType.STRING(30),
        allowNull: true
    })
    Pet_tipo!: string;

    @Column({
        type: DataType.STRING(30),
        allowNull: false
    })
    Pet_raca!: string;

    @Column({
        type: DataType.ENUM('Femea', 'Macho'),
        allowNull: false
    })
    Pet_genero!: 'Femea' | 'Macho';
    
    @ForeignKey(() => Cliente)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    Cliente_id!: number;

    @BelongsTo(() => Cliente)
    Cliente!: Cliente;

    @BelongsToMany(() => VendaItens, () => VendaItensPets)
    VendaItens!: VendaItens[];
}
