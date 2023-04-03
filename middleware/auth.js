
// Importar los módulos necesarios
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const Authorizations = require('../models/autorizations');

// Definir la función middleware para verificar la autenticación
async function authenticate(req, res, next) {
  // Obtener el token del encabezado de la solicitud
  const token = req.headers.authorization;

  // Verificar si se proporcionó un token
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verificar la validez del token y obtener el payload
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    // Obtener el ID de la aplicación a partir del token decodificado
    const appId = decoded.application_id;
    // Buscar una autorización correspondiente en la base de datos
    const auth = await Authorizations.findOne({ application_id: appId, token });
    // Verificar si se encontró una autorización
    if (!auth) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    return next();
  } catch (err) {
    // Si ocurre un error al verificar el token, responder con un error 401
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

// Exportar la función middleware
module.exports = authenticate;