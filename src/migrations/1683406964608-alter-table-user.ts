import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableUser1683406964608 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE user
                ADD typeUser number NOT NULL;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE user
                drop typeUser;
        `);
  }
}
