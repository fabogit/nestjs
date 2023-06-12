import { Expose, Transform } from 'class-transformer';

// fields to expose in the response
export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  maker: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  lat: number;

  @Expose()
  lng: number;

  @Expose()
  mileage: number;

  @Expose()
  isApproved: boolean;

  // transform report entity, report.user.id will be userId
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
