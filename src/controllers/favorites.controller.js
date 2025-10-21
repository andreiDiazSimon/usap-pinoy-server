import prisma from '../prisma/prismaClient.js';

export const addFavoriteController = async (req, res) => {
  try {
    const { userId, text, fromLang, toLang } = req.body;

    if (!userId || !text) {
      return res.status(400).json({ error: "userId and text are required" });
    }

    const from_to = fromLang && toLang ? `${fromLang} → ${toLang}` : null;

    const favorite = await prisma.favorite.create({
      data: {
        text,
        from_to,
        user: { connect: { id: userId } },
      },
    });

    res.status(201).json({
      message: "Favorite added successfully!",
      favorite,
    });
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getFavoritesByUserController = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: parseInt(userId) },
      orderBy: { id: 'desc' }, // optional: newest first
    });

    res.status(200).json({ favorites });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteFavoriteController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Favorite ID is required" });
    }

    const favorite = await prisma.favorite.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      message: "Favorite deleted successfully!",
      favorite,
    });
  } catch (error) {
    console.error("Error deleting favorite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

