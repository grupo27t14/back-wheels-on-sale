import { MigrationInterface, QueryRunner } from "typeorm";

export class EntitiCarImage1685735749901 implements MigrationInterface {
    name = 'EntitiCarImage1685735749901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "personal_informations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cpf" character varying NOT NULL, "phone" character varying NOT NULL, "birth_date" character varying NOT NULL, "description" character varying NOT NULL, "userId" uuid, CONSTRAINT "REL_621042422e461fb7d011775ea3" UNIQUE ("userId"), CONSTRAINT "PK_c7e5298a904681c7125177d4250" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "carId" uuid, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying NOT NULL, "model" character varying NOT NULL, "year" character varying NOT NULL, "fuel" character varying NOT NULL, "km" character varying NOT NULL, "color" character varying NOT NULL, "fipe" character varying NOT NULL, "price" character varying NOT NULL, "description" character varying NOT NULL, "published" TIMESTAMP NOT NULL, "is_promo" boolean NOT NULL, "userId" uuid, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "is_admin" boolean NOT NULL DEFAULT false, "is_seller" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address_informations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cep" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "street" character varying NOT NULL, "number" character varying NOT NULL, "complement" character varying NOT NULL, "userId" uuid, CONSTRAINT "REL_eaacbf2b5e0a256e2413c1af61" UNIQUE ("userId"), CONSTRAINT "PK_6ea0b01bc3ba09e7387e287ecfa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "personal_informations" ADD CONSTRAINT "FK_621042422e461fb7d011775ea30" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_c966d343d95687961368797192e" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_6431b6fec12c4090bb357fba2c2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address_informations" ADD CONSTRAINT "FK_eaacbf2b5e0a256e2413c1af614" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address_informations" DROP CONSTRAINT "FK_eaacbf2b5e0a256e2413c1af614"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_6431b6fec12c4090bb357fba2c2"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_c966d343d95687961368797192e"`);
        await queryRunner.query(`ALTER TABLE "personal_informations" DROP CONSTRAINT "FK_621042422e461fb7d011775ea30"`);
        await queryRunner.query(`DROP TABLE "address_informations"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "cars"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "personal_informations"`);
    }

}
