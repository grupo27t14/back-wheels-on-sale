import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Car } from "../../entities/car.entitie";
import { TCarsResponse } from "../../interfaces/car.interface";
import { carsSchemaResponse } from "../../schemas/car.schema";
import { TUserRes } from "../../interfaces/user.interface";

const listCarsService = async (): Promise<any> => {
  const carsRepository: Repository<Car> = AppDataSource.getRepository(Car);

  const cars: Car[] = await carsRepository.find({
    relations: { user: true }
  });

  console.log(cars);

  // const newList = cars.map((car) => {
  //   return (
  //     ...car,

  //   )
  // })

  // return carsSchemaResponse.parse(cars);
  return cars
};

export { listCarsService };
