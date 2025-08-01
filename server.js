// server.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.get('/gamepasses/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const response = await axios.get('https://catalog.roblox.com/v1/search/items', {
      params: {
        category: 1,           // Asset category
        subcategory: 5,        // Game Passes
        creatorTargetId: userId,
        salesTypeFilter: 1,    // Only those that are for sale
        limit: 30
      }
    });

    const gamepasses = response.data.data.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      assetUrl: `https://www.roblox.com/game-pass/${item.id}`
    }));

    res.json({ gamepasses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener Game Passes' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor iniciado en http://localhost:${PORT}`);
});
