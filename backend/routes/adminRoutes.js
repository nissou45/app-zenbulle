const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

router.use(auth, isAdmin);

router.get('/stats', async (req, res, next) => {
  try {
    const [[{totalUsers}]] = await db.query('SELECT COUNT(*) as totalUsers FROM utilisateurs');
    const [[{totalMoods}]] = await db.query('SELECT COUNT(*) as totalMoods FROM daily_moods');
    const [[{totalJournals}]] = await db.query('SELECT COUNT(*) as totalJournals FROM journal_entries');
    
    const [moods] = await db.query('SELECT label, COUNT(*) as count FROM daily_moods dm JOIN moods m ON dm.mood_id = m.id GROUP BY label');
    const moodStats = {};
    moods.forEach(m => moodStats[m.label] = m.count);

    res.json({ totalUsers, totalMoods, totalJournals, moodStats });
  } catch (err) { next(err); }
});

router.get('/users', async (req, res, next) => {
  try {
    const [users] = await db.query('SELECT id, pseudo, email, role, created_at FROM utilisateurs');
    res.json(users);
  } catch (err) { next(err); }
});

router.delete('/users/:id', async (req, res, next) => {
  try {
    if (parseInt(req.params.id) === req.session.user.id) return res.status(400).json({ message: 'Impossible de se supprimer soi-même' });
    await db.query('DELETE FROM utilisateurs WHERE id = ?', [req.params.id]);
    res.json({ ok: true });
  } catch (err) { next(err); }
});

router.get('/citations', async (req, res, next) => {
  try {
    const [citations] = await db.query('SELECT * FROM citations');
    res.json(citations);
  } catch (err) { next(err); }
});

router.post('/citations', async (req, res, next) => {
  try {
    const { mood, text } = req.body;
    await db.query('INSERT INTO citations (mood, text) VALUES (?, ?)', [mood, text]);
    res.json({ ok: true });
  } catch (err) { next(err); }
});

router.delete('/citations/:id', async (req, res, next) => {
  try {
    await db.query('DELETE FROM citations WHERE id = ?', [req.params.id]);
    res.json({ ok: true });
  } catch (err) { next(err); }
});

module.exports = router;
