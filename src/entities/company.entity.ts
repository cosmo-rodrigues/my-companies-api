import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './adress.entity';
import { User } from './user.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  website: string;

  @Column({ unique: true, nullable: false })
  cnpj: string;

  @ManyToOne(() => User, (user) => user.companies)
  user: User;

  @OneToMany(() => Address, (address) => address.company)
  addresses: Address[];
}
