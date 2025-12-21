import pool from "../config/db.ts";

export const experienceService = {
  create: async (data: any) => {
    const query = `
      INSERT INTO experience 
      (company_name, role, location, work_type, work_time_type, description, responsibilities, "from", "to")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;
    
    const values = [
      data.companyName, 
      data.role, 
      data.location,
      data.workType,
      data.workTimeType,
      data.description,
      data.responsibilities || [],
      data.from, 
      data.to || null
    ];
    
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  getAll: async () => {
    const { rows } = await pool.query('SELECT * FROM experience ORDER BY "from" DESC');
    return rows;
  },

  getById: async (id: string) => {
    const { rows } = await pool.query('SELECT * FROM experience WHERE id = $1', [id]);
    return rows[0];
  },

  update: async (id: string, data: any) => {
    const query = `
      UPDATE experience 
      SET company_name = $1, role = $2, location = $3, work_type = $4, 
          work_time_type = $5, description = $6, responsibilities = $7, "from" = $8, "to" = $9
      WHERE id = $10
      RETURNING *;
    `;
    const values = [
      data.companyName, data.role, data.location, data.workType, 
      data.workTimeType, data.description, data.responsibilities || [], 
      data.from, data.to || null, id
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  delete: async (id: string) => {
    await pool.query('DELETE FROM experience WHERE id = $1', [id]);
    return { message: "Deleted successfully" };
  }
};
