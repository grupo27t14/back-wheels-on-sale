import { MigrationInterface, QueryRunner } from "typeorm";

export class GenCarSpec1687522718527 implements MigrationInterface {
    name = 'GenCarSpec1687522718527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" ADD "spec" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "spec"`);
    }

}
