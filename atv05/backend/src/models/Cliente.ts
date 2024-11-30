import { Table, Column, Model, DataType, HasMany, BelongsTo, ForeignKey, HasOne } from 'sequelize-typescript';
import { CliEndereco } from './Endereco';
import { Rg } from './RG';
import { Pet } from './Pet';
import { Venda } from './Venda';
import { Telefone } from './Telefone';

@Table({
    tableName: 'Cliente',
    timestamps: true
})
export class Cliente extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    Cli_id!: number;

    @Column({
        type: DataType.STRING(80),
        allowNull: false
    })
    Cli_nome!: string;

    @Column({
        type: DataType.STRING(80),
        allowNull: true
    })
    Cli_nomeSocial!: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    Cli_email!: string;

    @Column({
        type: DataType.STRING(14),
        allowNull: false
    })
    Cli_cpf!: string;

    @HasMany(() => Rg)
    Rgs!: Rg[];

    @HasMany(() => Telefone)
    Telefones!: Telefone[];

    @HasOne(() => CliEndereco)
    Endereco!: CliEndereco;

    @HasMany(() => Pet)
    Pets!: Pet[];

    @HasMany(() => Venda)
    Vendas!: Venda[];
}
