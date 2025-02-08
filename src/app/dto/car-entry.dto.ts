export type CarEntryDTO = {
  readonly id: number | null;
  readonly title: string | null;
  readonly location: string | null;
  readonly price: number | null;
  readonly entryDate: string | null;
  readonly isDamaged: boolean | null;
  readonly make: string | null;
  readonly model: string | null;
  readonly engine: string | null;
  readonly carWeight: string | null;
  readonly carType: string | null;
  readonly metadata?: {
    readonly dateAdded: string | null;
    readonly dateEdited: string | null;
    readonly addedBy: number | null;
    readonly editedBy: number | null;
  };
};
