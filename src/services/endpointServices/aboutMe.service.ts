import pool from "../../config/db.ts";

export const aboutMeService = {
  ensureExists: async () => {
    const { rows } = await pool.query('SELECT * FROM about_me LIMIT 1');
    
    if (rows.length === 0) {
      
      const query = `
        INSERT INTO about_me (full_name, other_name, expertises, links, contact, images)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `;
      
      const defaultData = {
        fullName: 'Kyaw Phyoe Han',
        otherName: 'Eddie',
        expertises: ['Flutter Developer', 'Node.js Developer'],
        links: [
          { name: 'Github', link: 'https://github.com/walkmandede' },
          { name: 'LinkedIn', link: 'https://www.linkedin.com/in/kyaw-phyoe-han-aba3b9255/' }
        ],
        contact: {
          phone: '+66 627 052 637',
          email: 'kyawphyoehan2995@gmail.com',
          address: 'Bangkok, Thailand',
          originCountry: 'Myanmar',
          currentCountry: 'Thailand'
        },
        images: {
          profile: null,
          gallery: []
        }
      };

      const values = [
        defaultData.fullName,
        defaultData.otherName,
        defaultData.expertises,
        JSON.stringify(defaultData.links),
        JSON.stringify(defaultData.contact),
        JSON.stringify(defaultData.images)
      ];

      const result = await pool.query(query, values);
      return result.rows[0];
    }
    
    return rows[0];
  },

  get: async () => {
    await aboutMeService.ensureExists();
    
    const { rows } = await pool.query('SELECT * FROM about_me LIMIT 1');
    const data = rows[0];
    
    return {
      id: data.id,
      images: typeof data.images === 'string' ? JSON.parse(data.images) : data.images,
      fullName: data.full_name,
      otherName: data.other_name,
      expertises: data.expertises,
      links: typeof data.links === 'string' ? JSON.parse(data.links) : data.links,
      contact: typeof data.contact === 'string' ? JSON.parse(data.contact) : data.contact,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  },

  update: async (data: any) => {
    await aboutMeService.ensureExists();
    
    const query = `
      UPDATE about_me 
      SET full_name = $1,
          other_name = $2,
          expertises = $3,
          links = $4,
          contact = $5,
          images = $6,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = (SELECT id FROM about_me LIMIT 1)
      RETURNING *;
    `;

    console.log(data);

    const values = [
      data.fullName,
      data.otherName,
      data.expertises,
      JSON.stringify(data.links),
      JSON.stringify(data.contact),
      JSON.stringify(data.images)
    ];

    console.log(values);

    const { rows } = await pool.query(query, values);
    const result = rows[0];

    return {
      id: result.id,
      images: typeof result.images === 'string' ? JSON.parse(result.images) : result.images,
      fullName: result.full_name,
      otherName: result.other_name,
      expertises: result.expertises,
      links: typeof result.links === 'string' ? JSON.parse(result.links) : result.links,
      contact: typeof result.contact === 'string' ? JSON.parse(result.contact) : result.contact,
      createdAt: result.created_at,
      updatedAt: result.updated_at
    };
  }
};