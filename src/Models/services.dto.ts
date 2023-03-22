export interface Services {
  id: number;
  created_at: Date;
  modified_at: Date;
  shiftType: number; // 0=breakfast, 1=lunch, 2=diner
  shiftClosed: boolean;
}
