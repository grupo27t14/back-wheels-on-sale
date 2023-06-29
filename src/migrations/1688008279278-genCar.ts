import { MigrationInterface, QueryRunner } from "typeorm";

export class GenCar1688008279278 implements MigrationInterface {
    name = 'GenCar1688008279278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "is_published" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "is_published" SET DEFAULT true`);
    }

}
