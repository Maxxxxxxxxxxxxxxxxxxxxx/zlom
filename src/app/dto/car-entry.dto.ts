export interface CarEntryDTO {
  readonly id: number;
  readonly title: string;
  readonly location: string;
  readonly price: number;
  readonly entryDate: string;
  readonly isDamaged: boolean;
  readonly make: string;
  readonly model: string;
  readonly engine: string;
  readonly carWeight: string;
  readonly carType: string;
  readonly metadata?: {
    readonly dateAdded: string;
    readonly dateEdited: string;
    readonly addedBy: number;
    readonly editedBy: number;
  };
}
