import pool from "../../config/db.ts";

export const educationService = {
  create: async (data: any) => {
    console.log(data);
  
    const query = `
      INSERT INTO education 
      (name, "course_name", "from", "to", grade, remark)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    
    const values = [
      data.name,
      data.course_name,
      data.from,
      data.to || null,
      data.grade || '',
      data.remark || ''
    ];

    console.log(values);
    
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  getAll: async () => {
    const { rows } = await pool.query('SELECT * FROM education ORDER BY "from" DESC');
    return rows;
  },

  getById: async (id: string) => {
    const { rows } = await pool.query('SELECT * FROM education WHERE id = $1', [id]);
    return rows[0];
  },

  update: async (id: string, data: any) => {
    const query = `
      UPDATE education 
      SET name = $1, 
          course_name = $2, 
          "from" = $3, 
          "to" = $4, 
          grade = $5, 
          remark = $6
      WHERE id = $7
      RETURNING *;
    `;
    
    const values = [
      data.name,
      data.course_name,
      data.from,
      data.to || null,
      data.grade || '',
      data.remark || '',
      id
    ];
    
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  delete: async (id: string) => {
    const { rowCount } = await pool.query('DELETE FROM education WHERE id = $1', [id]);
    return rowCount! > 0;
  }
};