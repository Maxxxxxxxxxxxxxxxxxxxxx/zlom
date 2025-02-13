export interface UserDataDTO {
  readonly id?: number;
  readonly userRole?: 'USER' | 'ADMIN';
  readonly username?: string;
  readonly contactData?: {
    readonly email?: string;
    readonly phoneNumber?: number;
  };
}
