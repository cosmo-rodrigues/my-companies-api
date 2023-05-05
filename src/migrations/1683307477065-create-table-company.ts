import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCompany1683307477065 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE public.company (
          id integer NOT NULL,
          name character varying NOT NULL,
          website character varying NOT NULL,
          cnpj character varying NOT NULL,
          userId integer NOT NULL,
          createdAt timestamp without time zone DEFAULT now() NOT NULL,
          updatedAt timestamp without time zone DEFAULT now() NOT NULL,
          primary key (id)
          foreign key (userId) references public.user(id)
        )

        CREATE SEQUENCE public.company_id_seq
          AS integer
          START WITH 1
          INCREMENT BY 1
          NO MINVALUE
          NO MAXVALUE
          CACHE 1;

        ALTER SEQUENCE public.company_id_seq OWNED BY public.company.id;

        ALTER TABLE ONLY public.company ALTER COLUMN id SET DEFAULT nextval('public.company_id_seq'::regclass);
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.company;
    `);
  }
}
