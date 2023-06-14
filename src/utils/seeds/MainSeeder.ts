import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager, runSeeder } from "typeorm-extension";
import { UserSeeder } from "./UserSeeder";
import { CarSeeder } from "./CarSeeder";
import { ImageSeeder } from "./ImageSeeder";


export class MainSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        await runSeeder(dataSource, UserSeeder)
        await runSeeder(dataSource, CarSeeder)
        await runSeeder(dataSource, ImageSeeder)
    }
}