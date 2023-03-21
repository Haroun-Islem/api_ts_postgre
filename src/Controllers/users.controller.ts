import { QueryResult } from "pg";
import { User } from "../Models/users.dto";
import pool from "../data_base";

export class UserController {
  static async create(firstname: string, lastname: string, status: number): Promise<QueryResult> {
    const query = `INSERT INTO users (firstname, lastname, status, active) 
    VALUES ('${firstname}', '${lastname}', ${status}, true)`;
    const result = await pool.query(query);
    return result;
  }
  static async findAll(): Promise<User[]> {
    const query = "SELECT * FROM users";
    const result = await pool.query(query);
    return result.rows;
  }
  static async findById(id: number): Promise<User[]> {
    const query = `SELECT * FROM users WHERE id = ${id}`;
    const result = await pool.query(query);
    return result.rows;
  }
  static async setActive(id: number, active: boolean): Promise<QueryResult> {
    const query = `UPDATE users
    SET active = ${active}, modified_at = NOW()
    WHERE id = ${id}`;
    const result = await pool.query(query);
    return result;
  }
}
