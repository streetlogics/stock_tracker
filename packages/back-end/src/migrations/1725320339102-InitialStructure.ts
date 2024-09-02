import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialStructure1725320339102 implements MigrationInterface {
    name = 'InitialStructure1725320339102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`watches\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`stockId\` int NOT NULL, \`purchasePrice\` float NOT NULL, \`quantity\` int NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_3a38fa5895137aab44d5d5ddf6\` (\`userId\`), INDEX \`IDX_afa3e088582b82d3252e1ace54\` (\`stockId\`), INDEX \`IDX_644f13ab9ca1c93580acae5f94\` (\`createdAt\`), INDEX \`IDX_7e85f39f7858235232557dfa79\` (\`updatedAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`stocks\` (\`id\` int NOT NULL AUTO_INCREMENT, \`symbol\` varchar(255) NOT NULL, \`latestPrice\` float NOT NULL DEFAULT '0', \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_4351175e347f0f1397903edbf3\` (\`createdAt\`), INDEX \`IDX_2824e81fe65738625865d1dc28\` (\`updatedAt\`), UNIQUE INDEX \`IDX_abdd997b009437486baf753185\` (\`symbol\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`watches\` ADD CONSTRAINT \`FK_3a38fa5895137aab44d5d5ddf64\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`watches\` ADD CONSTRAINT \`FK_afa3e088582b82d3252e1ace540\` FOREIGN KEY (\`stockId\`) REFERENCES \`stocks\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`watches\` DROP FOREIGN KEY \`FK_afa3e088582b82d3252e1ace540\``);
        await queryRunner.query(`ALTER TABLE \`watches\` DROP FOREIGN KEY \`FK_3a38fa5895137aab44d5d5ddf64\``);
        await queryRunner.query(`DROP INDEX \`IDX_abdd997b009437486baf753185\` ON \`stocks\``);
        await queryRunner.query(`DROP INDEX \`IDX_2824e81fe65738625865d1dc28\` ON \`stocks\``);
        await queryRunner.query(`DROP INDEX \`IDX_4351175e347f0f1397903edbf3\` ON \`stocks\``);
        await queryRunner.query(`DROP TABLE \`stocks\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_7e85f39f7858235232557dfa79\` ON \`watches\``);
        await queryRunner.query(`DROP INDEX \`IDX_644f13ab9ca1c93580acae5f94\` ON \`watches\``);
        await queryRunner.query(`DROP INDEX \`IDX_afa3e088582b82d3252e1ace54\` ON \`watches\``);
        await queryRunner.query(`DROP INDEX \`IDX_3a38fa5895137aab44d5d5ddf6\` ON \`watches\``);
        await queryRunner.query(`DROP TABLE \`watches\``);
    }

}
