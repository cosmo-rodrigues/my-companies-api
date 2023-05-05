import { Column } from 'typeorm/decorator/columns/Column';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Entity } from 'typeorm/decorator/entity/Entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: string;

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
}
