import { MigrationInterface, QueryRunner } from "typeorm";

export class CrudEntities1686660106051 implements MigrationInterface {
    name = 'CrudEntities1686660106051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "avatar_bg" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "personal_informations" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address_informations" ALTER COLUMN "complement" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address_informations" ALTER COLUMN "complement" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "personal_informations" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar_bg"`);
    }

}
