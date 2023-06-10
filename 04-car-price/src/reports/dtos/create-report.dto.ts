import { IsEmail, IsString } from 'class-validator';

export class CreateReportDto {
  id: number;

  price: number;

  maker: string;

  model: string;

  year: number;

  lat: number;

  lng: number;

  mileage: number;
}
