'use strinct';

const Logs = require('../models/logs');
const logValidation = require('../validators/logValidator');


class MainController {

	//GET - Obtener todos los logs de las aplicaciones
	async all(req, res, next) {

		try {
			const logs = await Logs.find().populate('application_id');

			if (logs.length === 0) return res.status(200).json({ message: 'No hay elementos que mostrar.' });

			return res.status(200).json(logs);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}

	}
	//POST - Crear logs
	async create(req, res, next) {
		try {

			const { error } = logValidation(req.body);
			if (error) return res.status(400).send({ error:error.details[0].message});

			const log = new Logs(req.body);
			const save = await log.save();

			res.status(201).json(save);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
	//GET - Obtener log por ID
	async info(req, res, next) {

		try {
			const log = await Logs.findOne({ application_id: req.params.id }).populate('application_id');
			if (!log) {
				return res.status(404).send({ message: 'Log no encontrado' });
			}
			res.status(200).send(log);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}

	}
	//PUT - Actualizar log
	async update(req, res, next) {

		const { error } = logValidation(req.body);

		if (error) {
			return res.status(400).send({ message: error.details[0].message });
		}

		try {
			const updatedLog = await Logs.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
				runValidators: true
			});

			if (!updatedLog) {
				return res.status(404).send({ message: 'Log no encontrado' });
			}

			res.status(200).send(updatedLog);
		} catch (error) {
			res.status(500).send({ message: 'Error al actualizar el log' });
		}
	}
	//Delete - Eliminar log
	async delete(req, res, next) {
		try {
			const deletedLog = await Logs.findByIdAndDelete(req.params.id);

			if (!deletedLog) {
				return res.status(404).send({ message: 'Log no encontrado' });
			}

			res.status(200).send({ message: 'Log eliminado correctamente' });
		} catch (error) {
			res.status(500).send({ message: 'Error al eliminar el log' });
		}
	}
}

module.exports = new MainController();
