export class GetProfileDto {
  userId: string;
  phone?: string;
  email: string;
  role: string;
  status: string;

  constructor(partial: Partial<GetProfileDto>) {
    Object.assign(this, partial);
  }
}