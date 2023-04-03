'use strinct';

const Aplications = require('../models/aplications');
const Authorization = require('../models/autorizations');
const AplicationValidation = require('../validators/aplicationValidator');
const GenerateToken = require('../middleware/generateToken');
const mongoose = require('mongoose');

class MainController {

	//GET - Obtener todos las aplicaciones
	async all(req, res, next) {

		try {
			const aplications = await Authorization.find().populate('application_id');

			if (aplications.length == 0){
				return res.status(200).json({ message: 'No hay aplicaciones que mostrar.' });
			} 

			return res.status(200).json(aplications);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}

	}
	//POST - Crear aplicacion
	async create(req, res, next) {

		// Iniciar Transaction
		const session = await mongoose.startSession();
		session.startTransaction();

		try {

			const { error } = AplicationValidation(req.body);

			if (error) return res.status(400).send({ message: error.details[0].message });

			//se guarda aplicacion
			const aplication = new Aplications(req.body);
			const aplicationId = await aplication.save();

			//genero el token y se guarda 
			const token = GenerateToken(aplicationId._id);
			const authorization = new Authorization({ application_id: aplicationId._id, token });
			await authorization.save();

			// Confirmar transacción
			await session.commitTransaction();
			console.log('Transaction committed');

			return res.status(201).json(aplicationId);

		} catch (error) {
			// Rollback de transacción en caso de error
			await session.abortTransaction();
			return res.status(500).json({ error: error.message });
		} finally {
			// Finalizar sesión
			session.endSession();
		}
	}
	//GET - Obtener una aplicacion por ID
	async info(req, res, next) {

		try {
			const aplication = await Authorization.findOne({ 'application_id': req.params.id }).populate('application_id');

			if (!aplication) {
				return res.status(404).send({ message: 'Aplicación no encontrada.' });
			}

			return res.status(200).send(aplication);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}

	}
	//PUT - Actualizar aplicacion
	async update(req, res, next) {

		const { error } = AplicationValidation(req.body);

		if (error) return res.status(400).send({ message: error.details[0].message });

		try {

			const updatedAplication = await Aplications.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
				runValidators: true
			});

			if (!updatedAplication) {
				return res.status(404).send({ message: 'Aplicación no encontrado.' });
			}

			return res.status(200).send(updatedAplication);
		} catch (error) {
			return res.status(500).send({ error: 'Error al actualizar la aplicación.' });
		}
	}
	//Delete - Eliminar aplicacion
	async delete(req, res, next) {
		try {
			const deletedLog = await Aplications.findByIdAndDelete(req.params.id);
			// Filtro para eliminar la autorizacion por application_id

			if (!deletedLog) {
				return res.status(404).send({ message: 'Aplicación no encontrada' });
			}
			// Eliminar la autorizacion
			await Authorization.deleteOne({ 'application_id': req.params.id });

			return res.status(200).send({ message: 'Aplicación eliminada correctamente' });
		} catch (error) {
			return res.status(500).send({ error: 'Error al eliminar la aplicación', error });
		}
	}
}

module.exports = new MainController();
