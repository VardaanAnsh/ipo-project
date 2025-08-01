// backend/controllers/ipoController.js
const pool = require('../db');

// GET all IPOs
exports.getAllIPOs = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ipos ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET IPO by ID
exports.getIPOById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM ipos WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'IPO not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create IPO
exports.createIPO = async (req, res) => {
  const {
    company_name, price_band, open_date, close_date,
    issue_size, issue_type, status, listing_date,
    ipo_price, listing_price, listing_gain, cmp,
    return_percent, rhp, drhp
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO ipos (
        company_name, price_band, open_date, close_date, issue_size,
        issue_type, status, listing_date, ipo_price, listing_price,
        listing_gain, cmp, return_percent, rhp, drhp
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *`,
      [
        company_name, price_band, open_date, close_date, issue_size,
        issue_type, status, listing_date, ipo_price, listing_price,
        listing_gain, cmp, return_percent, rhp, drhp
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT update IPO
exports.updateIPO = async (req, res) => {
  const { id } = req.params;
  const {
    company_name, price_band, open_date, close_date,
    issue_size, issue_type, status, listing_date,
    ipo_price, listing_price, listing_gain, cmp,
    return_percent, rhp, drhp
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE ipos SET
        company_name=$1, price_band=$2, open_date=$3, close_date=$4,
        issue_size=$5, issue_type=$6, status=$7, listing_date=$8,
        ipo_price=$9, listing_price=$10, listing_gain=$11, cmp=$12,
        return_percent=$13, rhp=$14, drhp=$15
      WHERE id=$16 RETURNING *`,
      [
        company_name, price_band, open_date, close_date,
        issue_size, issue_type, status, listing_date,
        ipo_price, listing_price, listing_gain, cmp,
        return_percent, rhp, drhp, id
      ]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE IPO
exports.deleteIPO = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await pool.query('DELETE FROM ipos WHERE id = $1', [id]);
    res.status(200).json({ message: 'IPO deleted successfully' });
  } catch (err) {
    console.error('Error deleting IPO:', err);
    res.status(500).json({ error: 'Failed to delete IPO' });
  }
}
