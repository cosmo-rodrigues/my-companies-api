import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableAddress1683312881923 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE public.address (
          id integer NOT NULL,
          zipCode character varying NOT NULL,
          street character varying NOT NULL,
          number character varying NOT NULL,
          district character varying NOT NULL,
          city character varying NOT NULL,
          state character varying NOT NULL,
          companyId integer NOT NULL,
          createdAt timestamp without time zone DEFAULT now() NOT NULL,
          updatedAt timestamp without time zone DEFAULT now() NOT NULL,
          primary key (id)
          foreign key (companyId) references public.company(id)
        )

      CREATE SEQUENCE public.address_id_seq
        AS integer
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;

      ALTER SEQUENCE public.address_id_seq OWNED BY public.address.id;

      ALTER TABLE ONLY public.address ALTER COLUMN id SET DEFAULT nextval('public.address_id_seq'::regclass);
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.address;
    `);
  }
}
