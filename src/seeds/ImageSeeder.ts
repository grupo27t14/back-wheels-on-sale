import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Car } from "../entities/car.entitie";
import { Images } from "../entities/images.entitie";
import { DataSource } from "typeorm";
import { vehicles } from "./veicleData";
import getRandomInt from "../utils/random";

export class ImageSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const carRepository = dataSource.getRepository(Car);
    const imageRepository = dataSource.getRepository(Images);

    const cars = await carRepository.find();

    for (const car of cars) {
      const { model } = car;

      const vehicle = vehicles.find((vehicle) => vehicle.model === model);

      if (vehicle && vehicle.images) { // Verificar se vehicle.images não é undefined
        const randomIndex = getRandomInt(0, vehicle.images.length - 1);
        const imageUrl = vehicle.images[randomIndex];

        const image = new Images();
        image.url = imageUrl;
        image.car = car;

        await imageRepository.save(image);
      }
    }
  }
}
