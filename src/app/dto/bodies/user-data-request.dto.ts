export interface UserDataRequestDTO {
  readonly id?: number | null;
  readonly username?: string | null;
  readonly password?: string | null;
  readonly contactData?: {
    readonly email: string | null;
    readonly phoneNumber: number | null;
  };
}
