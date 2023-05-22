import { pool } from "../pool.js";

export const getCountry = (req, res) => {
//   const name = req.params.userId;
  const q = "SELECT name FROM country ";
  pool.query(q, (err, data) => {
    console.log("country: ",data.rows);
    if (err) return res.status(500).json(err);
       return res.status(200).json(data.rows.map(c=>c.name));
    //    return res.json(info);
  });
};

export const getRegion = (req, res) => {
    const q = `SELECT r.name FROM region AS r 
    JOIN country AS c ON (c.id = r.country_id) WHERE c.name=$1`;
    pool.query(q,[req.query.country], (err, data) => {
        console.log("params country: ", req.params.country);
        console.log("region: ",data.rows);
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.rows.map(c=>c.name));
    //    return res.json(info);
    });
};

export const getCity = (req, res) => {
        const q = `SELECT c.name FROM city AS c 
        JOIN region AS r ON(r.id = c.region_id) WHERE r.name=$1`;
        pool.query(q,[req.query.region], (err, data) => {
        console.log("country: ",data.rows);
        if (err) return res.status(500).json(err);
            return res.status(200).json(data.rows.map(c=>c.name));
        //    return res.json(info);
        });
    };