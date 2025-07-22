const express = require('express');
const router = express.Router();
const { Free } = require('../models');
const { Sequelize } = require('sequelize');

// Rota para obter categorias únicas dos conteúdos gratuitos
router.get('/categories', async (req, res) => {
  try {
    const categories = await Free.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('category')), 'category']
      ],
      where: {
        category: { [Sequelize.Op.ne]: null } // ignora categorias nulas
      }
    });

    // Formata como: [{ id: 1, name: 'Design', category: 'design' }, ...]
    const formattedCategories = categories.map((item, index) => ({
      id: String(index + 1),
      name: item.category,
      category: item.category
    }));

    res.json(formattedCategories);
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
});

module.exports = router;
