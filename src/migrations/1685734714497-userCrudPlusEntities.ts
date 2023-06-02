import { MigrationInterface, QueryRunner } from "typeorm";

export class UserCrudPlusEntities1685734714497 implements MigrationInterface {
    name = 'UserCrudPlusEntities1685734714497'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "personal_informations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cpf" character varying NOT NULL, "phone" character varying NOT NULL, "birth_date" character varying NOT NULL, "description" character varying NOT NULL, "userId" uuid, CONSTRAINT "REL_621042422e461fb7d011775ea3" UNIQUE ("userId"), CONSTRAINT "PK_c7e5298a904681c7125177d4250" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "is_admin" boolean NOT NULL DEFAULT false, "is_seller" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address_informations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cep" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "street" character varying NOT NULL, "number" character varying NOT NULL, "complement" character varying NOT NULL, "userId" uuid, CONSTRAINT "REL_eaacbf2b5e0a256e2413c1af61" UNIQUE ("userId"), CONSTRAINT "PK_6ea0b01bc3ba09e7387e287ecfa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "personal_informations" ADD CONSTRAINT "FK_621042422e461fb7d011775ea30" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address_informations" ADD CONSTRAINT "FK_eaacbf2b5e0a256e2413c1af614" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address_informations" DROP CONSTRAINT "FK_eaacbf2b5e0a256e2413c1af614"`);
        await queryRunner.query(`ALTER TABLE "personal_informations" DROP CONSTRAINT "FK_621042422e461fb7d011775ea30"`);
        await queryRunner.query(`DROP TABLE "address_informations"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "personal_informations"`);
    }

}
