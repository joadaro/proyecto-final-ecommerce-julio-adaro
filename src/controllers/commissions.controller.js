import * as models from '../models/commission.model.js';

const getAllCommissions = async (req, res) => {
    const commissions = await models.getAllCommissions();
    if (!commissions || commissions.length === 0) {
        const msg = `No se encontraron comisiones o la base de datos se encuentra vacía`;
        console.log(`Error: ${msg}`);
        return res.status(200).json({'Error 404': msg});
    }
    console.log(`Mensaje: Se encontraron ${commissions.length} comisiones`);
    res.status(200).json(commissions);
}

const searchCommissions = async (req, res) => {
    const { category, name, type } = req.query;
    let errormsg = 'error';
    if ( !category && !name && !type ) {
        errormsg = `Debe especificar al menos un parámetro de búsqueda`;
        console.log(`Error: ${errormsg}`);
        return res.status(400).json({'Error 400': errormsg});
    }
    const filteredCommissions = await models.searchCommission(req.query);
    if (!filteredCommissions || filteredCommissions.length === 0) {
        errormsg = `No se encontraron comisiones que coincidan con los criterios de búsqueda`;
        console.log(`Error: ${errormsg}`);
        return res.status(404).json({'Error 404': errormsg});
    } else {
        console.log(`Mensaje: Se encontraron ${filteredCommissions.length} comisiones que coinciden con los criterios de búsqueda`);
        res.status(200).json(filteredCommissions);
    }
}

const createCommission = async (req, res) => {
    // Aviso: Si se indicó el valor type='rango', el valor range es obligatorio de lo contrario es opcional
    const { category, name, range, type, value } = req.body;
    if  ( !category || !name || !type || !value || ( (type === 'rango') && !Array.isArray(range) ) ) {
        const errormsg = `Faltan datos requeridos para crear la comisión`;
        console.log(`Error: ${errormsg}`);
        return res.status(400).json({'Error 400': errormsg});
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
    const msg = `Nueva comisión creada en éxito`;
    console.log(createCommission);
    console.log(`Mensaje: ${msg}`);
    res.status(200).json({ 'Mensaje': msg, 'Comisión': createdCommission });
}

const updateCommission = async (req, res) => {
    const id = req.params.id;
    const updatedCom = req.body;
    const { range, type } = updatedCom;
    let errormsg = `Error desconocido`;
    if  ( (type === 'rango') && !Array.isArray(range) ) {
        errormsg = `Faltan datos requeridos para actualizar la comisión`;
        console.log(`${errormsg}`);
        return res.status(400).json({'Error 400': errormsg});
    }
    if ( Array.isArray(range) && (range.length == 2) && (range[0] > range[1]) ) {
        let aux = range[0];
        range[0] = range[1];
        range[1] = aux;
    }
    const result = await models.updateCommission(id, updatedCom);
    if (result) {
        console.log(`Mensaje: Comisión con id ${id} actualizada con éxtio`);
        res.status(200).json({'Mensaje': `Comisión con id ${id} actualizada con éxtio`, 'Comisión': result});
    } else {
        errormsg = ` No se encontró la comisión con id ${id}`;
        console.log(`Error: ${errormsg}`);
        res.status(404).json({'Error 404': errormsg});
    }
}

const deleteCommission = async (req, res) => {
    const id = req.params.id;
    let errormsg = `Error desconocido`;
    try {
        const comm = await models.getCommissionById(id);
        if (!comm) {
            errormsg = `No se encontró la comisión con id ${id}`;
            console.log(`Error: ${errormsg}`);
            return res.status(404).json({'Error 404': errormsg});
        }
        const result = await models.deleteCommission(id);
        console.log(`Mensaje: Se eliminó la comisión con id ${id}`)
        res.status(200).json({'Mensaje': `Se eliminó la comisión con id ${id}`});
    } catch (error) {
        errormsg = `Error interno del servidor al intentar eliminar la comisión con id ${id}`;
        console.error(`${errormsg}:`, error);
        res.status(500).json({'Error 500': errormsg});
    }
}

export {
    getAllCommissions,
    searchCommissions,
    createCommission,
    updateCommission,
    deleteCommission
}