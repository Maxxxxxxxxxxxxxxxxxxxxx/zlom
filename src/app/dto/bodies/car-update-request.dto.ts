export type CarUpdateRequest = {
  readonly id?: number;
  readonly title?: string | null;
  readonly location?: string | null;
  readonly price?: number | null;
  readonly entryDate?: string | null;
  readonly isDamaged?: boolean | null;
  readonly make?: string | null;
  readonly model?: string | null;
  readonly engine?: string | null;
  readonly carWeight?: number | null;
  readonly carType?: string | null;
};
