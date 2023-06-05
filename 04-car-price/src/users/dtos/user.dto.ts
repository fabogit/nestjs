import { Expose } from 'class-transformer';

// fields to expose in the response
export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}
