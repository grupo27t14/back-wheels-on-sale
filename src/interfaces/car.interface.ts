import { z } from "zod";
import { DeepPartial } from "typeorm";
import {
  carSchema,
  carSchemaRequest,
  carsSchemaResponse,
} from "../schemas/car.schema";

type TCar = z.infer<typeof carSchema>;
type TCarRequest = z.infer<typeof carSchemaRequest>;
type TCarResponse = z.infer<typeof carSchema>;
type TCarsResponse = z.infer<typeof carsSchemaResponse>;
type TCarUpdateRequest = DeepPartial<TCarRequest>;

interface IPaginationCars {
  next: string | null;
  previous: string | null;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  results: TCarsResponse;
}

export { TCar, TCarRequest, TCarResponse, TCarUpdateRequest, TCarsResponse, IPaginationCars };
