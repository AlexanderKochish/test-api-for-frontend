const { Position } = require("../models/models");

class PositionController {
    
  async getAllPositions(req, res) {
    try {
      const positions = await Position.findAll();
      if(!positions){
        const errorData = {
          "success": false,
          "message": "Positions not found"
        }
        return res.status(422).json(errorData)
      }
      const data = {
        success: true,
        positions,
      };
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new PositionController();
