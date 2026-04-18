// Simple index handler for API routes
export default function handler(req, res) {
  res.status(200).json({
    message: 'IITM Scholar Hub API is operational',
    status: 'ok',
    timestamp: new Date().toISOString()
  });
}