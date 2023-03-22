import { QueryResult } from "pg";
import { TipsPayments } from "../Models/tips_payments.dto";
import { TipsWeekPayments } from "../Models/tipsweek_outpout.dto";
import { TipsMonthPayments } from "../Models/tipsmonth_outpout.dto";
import { TipsFullMonthPayments } from "../Models/tipsfullmonth_outpout.dto";
import pool from "../data_base";

export class TipsController {
  static async addTips(
    tips: number,
    id_restaurantTable: number,
    id_service: number
  ): Promise<QueryResult> {
    const query = `INSERT INTO table_tips (tips, id_restaurantTable, id_service) 
    VALUES (${tips}, ${id_restaurantTable}, ${id_service})`;
    const result = await pool.query(query);
    return result;
  }
  static async addTipsPayment(
    tips: number,
    id_user: number
  ): Promise<QueryResult> {
    const query = `INSERT INTO tips_payments (tips, id_user) 
    VALUES (${tips}, ${id_user})`;
    const result = await pool.query(query);
    return result;
  }
  static async getBestDayTipsByWeek(): Promise<TipsWeekPayments[]> {
    const query = `WITH tips_per_day AS (
      SELECT 
        date_trunc('day', created_at) AS day_start,
        sum(amount) AS total_tips
      FROM tips_payments
      WHERE extract(year from created_at) = extract(year from now())
      GROUP BY day_start
    ), 
    tips_per_week AS (
      SELECT 
        date_trunc('week', day_start) AS week_start,
        extract(week from day_start) AS week_number,
        day_start,
        total_tips,
        ROW_NUMBER() OVER (PARTITION BY date_trunc('week', day_start) ORDER BY total_tips DESC) AS rank
      FROM tips_per_day
    )
    SELECT 
      week_number, 
      day_start::date AS date,
      total_tips
    FROM tips_per_week
    WHERE rank = 1
    ORDER BY week_number;`;
    const result = await pool.query(query);
    return result.rows;
  }
  static async getAllTipsByWeekAndDay(): Promise<TipsWeekPayments[]> {
    const query = `SELECT to_char(created_at, 'IW') AS week_number,
    created_at::date AS date,
    sum(amount) AS total_tips
    FROM tips_payments
    WHERE extract(year from created_at) = extract(year from now())
    GROUP BY week_number, date
    ORDER BY week_number, total_tips DESC`;
    const result = await pool.query(query);
    return result.rows;
  }
  static async getAllTipsByWeek(): Promise<TipsWeekPayments[]> {
    const query = `SELECT to_char(created_at, 'WW')::int - to_char(date_trunc('month', created_at), 'WW')::int + 1 AS week_number,
        sum(amount) AS total_tips
    FROM tips_payments
    WHERE extract(year from created_at) = extract(year from now())
    AND extract(month from created_at) = extract(month from now())
    GROUP BY week_number
    ORDER BY week_number;
    `;
    const result = await pool.query(query);
    return result.rows;
  }
  static async getBestWeekTipsByMonth(): Promise<TipsFullMonthPayments[]> {
    const query = `WITH tips_per_day AS (
      SELECT 
        date_trunc('day', created_at) AS day_start,
        sum(amount) AS total_tips
      FROM tips_payments
      WHERE extract(year from created_at) = extract(year from now())
      GROUP BY day_start
    ), 
    tips_per_week AS (
      SELECT 
        date_trunc('week', day_start) AS week_start,
        extract(week from day_start) AS week_number,
        day_start,
        total_tips,
        ROW_NUMBER() OVER (PARTITION BY date_trunc('week', day_start) ORDER BY total_tips DESC) AS rank
      FROM tips_per_day
    ),
    max_tips_per_month AS (
      SELECT 
        date_trunc('month', day_start) AS month_start,
        MAX(total_tips) AS max_tips
      FROM tips_per_week
      GROUP BY month_start
    )
    SELECT 
      extract(month from week_start) AS month_number,
      to_char(week_start, 'Month') AS month_name,
      week_number,
      day_start::date AS date,
      total_tips
    FROM tips_per_week
    JOIN max_tips_per_month 
      ON date_trunc('month', day_start) = month_start AND total_tips = max_tips
    ORDER BY month_number, week_number;`;
    const result = await pool.query(query);
    return result.rows;
  }
  static async getAllTipsByWeekAndMonth(): Promise<TipsFullMonthPayments[]> {
    const query = `SELECT 
      extract(month from week_start) AS month_number,
      to_char(week_start, 'Month') AS month_name,
      extract(week from week_start) AS week_number,
      date_trunc('day', week_start) AS week_date,
      sum(total_tips) AS total_tips
    FROM (
      SELECT 
        date_trunc('week', created_at) AS week_start,
        sum(amount) AS total_tips
      FROM tips_payments
      WHERE extract(year from created_at) = extract(year from now())
      GROUP BY week_start
    ) tips_per_week
    GROUP BY month_number, month_name, week_number, week_date
    ORDER BY month_number, week_number;
    `;
    const result = await pool.query(query);
    return result.rows;
  }
  static async getAllTipsByMonth(): Promise<TipsMonthPayments[]> {
    const query = `SELECT 
      extract(month from created_at) AS month_number,
      to_char(created_at, 'Month') AS month_name,
      sum(amount) AS total_tips
    FROM tips_payments
    WHERE extract(year from created_at) = extract(year from now())
    GROUP BY month_number, month_name
    ORDER BY month_number;`;
    const result = await pool.query(query);
    return result.rows;
  }
}