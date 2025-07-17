import * as models from '../models/commission.model.js';

const getAllCommissions = async (req, res) => {
    const commissionsList = await models.getAllCommissions();
    if (!commissionsList || commissionsList.length === 0) {
        return res.status(200).json({'Error 404': 'No se encontraron comisiones o la base de datos se encuentra vacía'});
    }
    console.log(`Mensaje: Se encontraron ${commissionsList.length} comisiones`);
    res.status(200).json(commissionsList);
}

const searchCommissions = async (req, res) => {
    const { category, name, type } = req.query;
    if ( !category && !name && !type ) {
        return res.status(400).json({'Error 400': 'Debe especificar al menos un parámetro de búsqueda'});
    }
    const filteredCommissions = await models.searchCommission(req.query);
    if (!filteredCommissions || filteredCommissions.length === 0) {
        console.log('Error: No se encontraron comisiones que coincidan con los criterios de búsqueda');
        return res.status(404).json({'Error 404': 'No se encontraron comisiones que coincidan con los criterios de búsqueda'});
    } else {
        console.log(`Mensaje: Se encontraron ${filteredCommissions.length} comisiones que coinciden con los criterios de búsqueda`);
        res.status(200).json(filteredCommissions);
    }
}

const createCommission = async (req, res) => {
    const { category, name, range, type, value } = req.body;
    if  ( !category || !name || !type || !value || ( (type === 'rango') && !Array.isArray(range) ) ) {
        console.log('Error: Faltan datos obligatorios para crear la comisión');
        return res.status(400).json({ error: 'Faltan datos obligatorios para crear la comisión' });
    }
    if (Array.isArray(range) && (range.length == 2) && (range[0] > range[1])) {
        let aux = range[0];
        range[0] = range[1];
        range[1] = aux;
    }
    // Estructura de la nueva Comisión
    const newCommission = {
        category: category,                     // Categoría de producto
        name: name,                             // Nombre de la comisión
        range: (type === 'rango') ? range : "", // Rango de precios afectados a la comisión
        type: type,                             // Tipo de comisión (fijo, porcentaje, rango)
        value: value                            // Valor de la comisión o multiplicador para cálculo de porcentaje
    }
    const createdCommission = await models.createCommission(newCommission);
    console.log('Mensaje: La nueva comisión se creó exitosamente');
    res.status(200).json({'Mensaje': 'La nueva comisión se creó exitosamente', 'Comisión': createdCommission});
}

const updateCommission = async (req, res) => {
    const id = req.params.id;
    const updatedCom = req.body;
    const { range, type } = updatedCom;
    if  ( (type === 'rango') && !Array.isArray(range) ) {
        console.log('Error: Faltan datos obligatorios para actualizar la comisión');
        return res.status(400).json({ error: 'Faltan datos obligatorios para actualizar la comisión' });
    }
    if ( Array.isArray(range) && (range.length == 2) && (range[0] > range[1]) ) {
        let aux = range[0];
        range[0] = range[1];
        range[1] = aux;
    }
    const result = await models.updateCommission(id, updatedCom);
    if (result) {
        console.log(`Mensaje: Comisión con id ${id} actualizada exitosamente`);
        res.status(200).json({'Mensaje': 'Comisión actualizada exitosamente', 'Comisión': result});
    } else {
        console.log(`Error: No se encontró la comisión con id ${id}`);
        res.status(404).json({'Error 404': `No se encontró la comisión con el id especificado`});
    }
}

const deleteCommission = async (req, res) => {
    const id = req.params.id;
    try {
        const comm = await models.getCommissionById(id);
        if (!comm) {
            return res.status(404).json({'Error 404': `No se encontró comisión con id ${id}`});
        }
        const result = await models.deleteCommission(id);
        res.status(200).json({'Mensaje': 'Comisión eliminada exitosamente'});
    } catch (error) {
        console.error(`Error al eliminar comisión con id ${id}:`, error);
        res.status(500).json({'Error 500': 'Error interno del servidor al eliminar la comisión'});    
    }
}

export {
    getAllCommissions,
    searchCommissions,
    createCommission,
    updateCommission,
    deleteCommission
}