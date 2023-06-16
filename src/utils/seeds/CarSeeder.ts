import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { Car } from "../../entities/car.entitie";
import { User } from "../../entities/user.entitie";

import { vehicles } from "./veicleData";
import { randomNumbers } from "../../utils/random";



export class CarSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const carRepository = dataSource.getRepository(Car);
    const userRepository = dataSource.getRepository(User);

    const users = await userRepository.find();

    for (const user of users) {
      for (let i = 0; i < 5; i++) {
        const randomIndex = randomNumbers(0, vehicles.length);
        const vehicle = vehicles[randomIndex];

        const car = new Car();
        car.brand = vehicle.brand;
        car.model = vehicle.model;
        car.year = vehicle.year;
        car.fuel = vehicle.fuel;
        car.km = vehicle.km;
        car.color = vehicle.color;
        car.fipe = vehicle.fipe;
        car.price = vehicle.price;
        car.is_promo = vehicle.is_promo;
        car.description = vehicle.description;
        car.created_at = new Date();

        car.user = user; // Associar o carro ao usuário atual

        await carRepository.save(car);
      }
    }
  }
}
