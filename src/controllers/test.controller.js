export const testController = (req, res) => {
  res.json({
    message: '✅ Express app is working!',
    time: new Date().toISOString(),
  });
};
