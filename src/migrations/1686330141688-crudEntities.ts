import { MigrationInterface, QueryRunner } from "typeorm";

export class CrudEntities1686330141688 implements MigrationInterface {
    name = 'CrudEntities1686330141688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" ADD "is_published" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "is_published"`);
    }

}
