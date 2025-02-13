export interface UserDataRequestDTO {
  readonly id?: number;
  readonly username?: string;
  readonly password?: string;
  readonly contactData?: {
    readonly email: string;
    readonly phoneNumber: number;
  };
}
