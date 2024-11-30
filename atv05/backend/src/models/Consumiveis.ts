import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { VendaItens } from './VendaItens';

@Table({
    tableName: 'Consumiveis',
    timestamps: true
})

export class Consumiveis extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    Cons_id!: number;

    @Column({
        type: DataType.STRING(30),
        allowNull: false
    })
    Cons_nome!: string;

    @Column({
        type: DataType.STRING(80),
        allowNull: false
    })
    Cons_descricao!: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    Cons_valor!: number;
    
    @Column({
        type: DataType.ENUM('Produto', 'Servico'), 
        allowNull: false,
    })
    Cons_tipo!: 'Produto' | 'Servico';

    @HasMany(() => VendaItens)
    Venda_itens!: VendaItens[];
}
