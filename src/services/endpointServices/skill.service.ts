import pool from "../../config/db.ts";

export const skillService = {
  create: async (data: any) => {
    console.log(`
      INSERT INTO skill 
      (name, description, experiences)
      VALUES ($1, $2, $3)
      RETURNING *;
    `);
    const query = `
      INSERT INTO skill 
      (name, description, experiences)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    
    const values = [
      data.name,
      data.description,
      data.experiences || [],
    ];
    
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  getAll: async () => {
    const { rows } = await pool.query('SELECT * FROM skill');
    return rows;
  },

  getById: async (id: string) => {
    const { rows } = await pool.query('SELECT * FROM skill WHERE id = $1', [id]);
    return rows[0];
  },

  update: async (id: string, data: any) => {
    const query = `
      UPDATE skill 
      SET name = $1, 
          description = $2, 
          experiences = $3           
      WHERE id = $4
      RETURNING *;
    `;
    
    const values = [
      data.name,
      data.description,
      data.experiences || [],   
      id
    ];
    
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  delete: async (id: string) => {
    const { rowCount } = await pool.query('DELETE FROM skill WHERE id = $1', [id]);
    return rowCount! > 0;
  }
};