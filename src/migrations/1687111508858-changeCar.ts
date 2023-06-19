import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeCar1687111508858 implements MigrationInterface {
    name = 'ChangeCar1687111508858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "km"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "km" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "is_published" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "is_published" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "price" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "km"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "km" character varying NOT NULL`);
    }

}
