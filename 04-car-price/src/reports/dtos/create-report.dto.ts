import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLatitude,
  IsLongitude,
} from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  @Min(0)
  @Max(1e6)
  price: number;

  @IsString()
  maker: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1900)
  @Max(2025)
  year: number;

  @IsLatitude()
  lat: number;

  @IsLongitude()
  lng: number;

  @IsNumber()
  @Min(0)
  @Max(1e6)
  mileage: number;
}
