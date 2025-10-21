import prisma from '../prisma/prismaClient.js'
import bcrypt from 'bcrypt';

export const getProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: { id: true, username: true, email: true },
    });

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Update Email
export const updateEmail = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  console.log(id, email)
  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { email },
      select: { id: true, username: true, email: true },
    });

    res.status(200).json({ message: 'Email updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating email:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Delete Account
export const deleteAccount = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// ✅ Change Password
export const updatePassword = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;
  console.log(currentPassword, newPassword)
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Both current and new passwords are required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if current password matches
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update in DB
    await prisma.user.update({
      where: { id: Number(id) },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
