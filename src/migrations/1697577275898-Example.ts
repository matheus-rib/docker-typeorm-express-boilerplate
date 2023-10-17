import { MigrationInterface, QueryRunner } from "typeorm";

export class Example1697577275898 implements MigrationInterface {
    name = 'Example1697577275898'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "examples" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "foo" character varying NOT NULL, "bar" smallint NOT NULL, CONSTRAINT "PK_ea56499b0a3a29593d3405080e8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "examples"`);
    }

}
