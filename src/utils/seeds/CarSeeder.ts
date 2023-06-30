import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { Car } from "../../entities/car.entitie";
import { User } from "../../entities/user.entitie";

import { vehicles } from "./veicleData";
import { randomNumbers } from "../../utils/random";

export class CarSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
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
        car.spec = Array.isArray(vehicle.spec) ? vehicle.spec[randomNumbers(0, vehicle.spec.length)] : vehicle.spec;
        car.year = Array.isArray(vehicle.year) ? vehicle.year[randomNumbers(0, vehicle.year.length)] : vehicle.year;
        car.fuel = vehicle.fuel;
        car.km = Array.isArray(vehicle.km) ? vehicle.km[randomNumbers(0, vehicle.km.length)] : vehicle.km;
        car.color = vehicle.color;
        car.fipe = vehicle.fipe;
        car.price = Array.isArray(vehicle.price) ? vehicle.price[randomNumbers(0, vehicle.price.length)] : vehicle.price;
        car.is_promo = vehicle.is_promo;
        car.description = Array.isArray(vehicle.description) ? vehicle.description[randomNumbers(0, vehicle.description.length)] : vehicle.description;
        car.created_at = new Date();

        car.user = user; // Associar o carro ao usuário atual

        await carRepository.save(car);
      }
    }
  }
}
