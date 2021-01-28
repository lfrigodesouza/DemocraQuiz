import db from '../../db.json';

export default function Db(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  req.setHeader('Access-Control-Allow-Credentials', true);
  req.setHeader('Access-Control-Allow-Origin', '*');
  req.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

  res.json(db);
}
