import { QueryResult } from "pg";
import { ServiceUser } from "../Models/service_users.dto"; 
import { Services } from "../Models/services.dto";
import pool from "../data_base";

export class ServicesController {
  static async createService(shiftType: number): Promise<QueryResult> {
    const query = `INSERT INTO services (shiftType, shiftClosed) 
    VALUES (${shiftType}, false)`;
    const result = await pool.query(query);
    return result;
  }
  static async createServiceUsers(ids: number[], service_id: number): Promise<QueryResult> {
    const query = `INSERT INTO service_users (id_user, id_service)
    SELECT id, ${service_id}
    FROM users
    WHERE id IN (${ids.join(', ')})`;
    const result = await pool.query(query);
    return result;
  }
  static async findAllServices(): Promise<Services[]> {
    const query = "SELECT * FROM services";
    const result = await pool.query(query);
    return result.rows;
  }
  static async findAllServicesUser(): Promise<ServiceUser[]> {
    const query = "SELECT * FROM service_users";
    const result = await pool.query(query);
    return result.rows;
  }
  static async findServicesById(id: number): Promise<Services[]> {
    const query = `SELECT * FROM services WHERE id = ${id}`;
    const result = await pool.query(query);
    return result.rows;
  }
  static async findServicesUserByUserId(id: number): Promise<ServiceUser[]> {
    const query = `SELECT * FROM service_users WHERE id_user = ${id}`;
    const result = await pool.query(query);
    return result.rows;
  }
  static async findServicesUserByServiceId(id: number): Promise<ServiceUser[]> {
    const query = `SELECT * FROM service_users WHERE id_service = ${id}`;
    const result = await pool.query(query);
    return result.rows;
  }
}