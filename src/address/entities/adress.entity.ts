import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Company } from '../../company/entities/company.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  zipCode: string;

  @Column({ nullable: false })
  street: string;

  @Column({ nullable: false })
  number: string;

  @Column({ nullable: false })
  district: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  state: string;

  @CreateDateColumn({ type: 'timestamp', name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updatedAt' })
  updatedAt: Date;

  @ManyToOne(() => Company, (company) => company.addresses)
  @JoinColumn({ name: 'companyId', referencedColumnName: 'id' })
  company: Company;
}
