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