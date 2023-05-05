import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @CreateDateColumn({ type: 'timestamp', name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updatedAt' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.companies)
  user: User;

  @OneToMany(() => Address, (address) => address.company)
  addresses: Address[];
}
