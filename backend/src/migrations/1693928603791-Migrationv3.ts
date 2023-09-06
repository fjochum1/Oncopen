import {MigrationInterface, QueryRunner} from "typeorm";

export class Migrationv31693928603791 implements MigrationInterface {
    name = 'Migrationv31693928603791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "username" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "user_role" text, "date" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "username", "email", "password", "user_role", "date") SELECT "id", "username", "email", "password", "user_role", "date" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_patient" ("id" varchar PRIMARY KEY NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "dateOfBirth" text NOT NULL, "sex" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_patient"("id", "firstName", "lastName", "dateOfBirth", "sex") SELECT "id", "firstName", "lastName", "dateOfBirth", "sex" FROM "patient"`);
        await queryRunner.query(`DROP TABLE "patient"`);
        await queryRunner.query(`ALTER TABLE "temporary_patient" RENAME TO "patient"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "username" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "user_role" text, "date" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "username", "email", "password", "user_role", "date") SELECT "id", "username", "email", "password", "user_role", "date" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "username" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "user_role" text, "date" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`INSERT INTO "user"("id", "username", "email", "password", "user_role", "date") SELECT "id", "username", "email", "password", "user_role", "date" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "patient" RENAME TO "temporary_patient"`);
        await queryRunner.query(`CREATE TABLE "patient" ("id" varchar PRIMARY KEY NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "age" integer NOT NULL, "dateOfBirth" text NOT NULL, "sex" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "patient"("id", "firstName", "lastName", "dateOfBirth", "sex") SELECT "id", "firstName", "lastName", "dateOfBirth", "sex" FROM "temporary_patient"`);
        await queryRunner.query(`DROP TABLE "temporary_patient"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "username" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "user_role" text, "date" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`INSERT INTO "user"("id", "username", "email", "password", "user_role", "date") SELECT "id", "username", "email", "password", "user_role", "date" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
