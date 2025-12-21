import pool from "../config/db.ts";

export const projectService = {
  create: async (data: any) => {
    const query = `
      INSERT INTO project 
      (project_name, short_description, description, tech_stacks, responsibilities, links, project_logo, images)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    
    const values = [
      data.projectName,
      data.shortDescription || '',
      data.description || '',
      data.techStacks || [],
      data.responsibilities || [],
      JSON.stringify(data.links || []),
      data.projectLogo || '',
      data.images || []
    ];
    
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  getAll: async () => {
    const { rows } = await pool.query('SELECT * FROM project ORDER BY created_at DESC');
    return rows.map(row => ({
      ...row,
      links: typeof row.links === 'string' ? JSON.parse(row.links) : row.links
    }));
  },

  getById: async (id: string) => {
    const { rows } = await pool.query('SELECT * FROM project WHERE id = $1', [id]);
    if (rows[0]) {
      return {
        ...rows[0],
        links: typeof rows[0].links === 'string' ? JSON.parse(rows[0].links) : rows[0].links
      };
    }
    return null;
  },

  update: async (id: string, data: any) => {
    const query = `
      UPDATE project 
      SET project_name = $1, 
          short_description = $2, 
          description = $3, 
          tech_stacks = $4, 
          responsibilities = $5, 
          links = $6, 
          project_logo = $7, 
          images = $8
      WHERE id = $9
      RETURNING *;
    `;
    
    const values = [
      data.projectName,
      data.shortDescription || '',
      data.description || '',
      data.techStacks || [],
      data.responsibilities || [],
      JSON.stringify(data.links || []),
      data.projectLogo || '',
      data.images || [],
      id
    ];
    
    const { rows } = await pool.query(query, values);
    if (rows[0]) {
      return {
        ...rows[0],
        links: typeof rows[0].links === 'string' ? JSON.parse(rows[0].links) : rows[0].links
      };
    }
    return null;
  },

  delete: async (id: string) => {
    const { rowCount } = await pool.query('DELETE FROM project WHERE id = $1', [id]);
    return rowCount! > 0;
  }
};