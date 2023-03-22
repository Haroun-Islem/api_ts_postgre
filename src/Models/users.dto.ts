export interface User {
  id: number;
  created_at: Date;
  modified_at: Date;
  firstname: string;
  lastname: string;
  status: boolean; 
  active: boolean;
}
