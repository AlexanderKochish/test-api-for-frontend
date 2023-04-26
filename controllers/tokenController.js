const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')

class TokenController {
  async getToken(req, res) {
    try {
      const hashName = await bcrypt.hash( "Alexandr",  5);
      const hashEmail = await bcrypt.hash( "alex@example.com", 5)
      const id = await bcrypt.hash( String(Date.now()), 5)
      const token = jwt.sign(
        { id: id, name: hashName, email: hashEmail },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      return res.json({ success: true, token });
    } catch (error) {
      return res.status(500).json({message: error.message})
    }
    
  }
}

module.exports = new TokenController();
