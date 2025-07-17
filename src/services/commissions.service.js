import * as models from '../models/commission.model.js';

const getCommission = async (params) => {
    const { category, article, price } = params;
    if ( !category || !article || !price ) {
        return 0;
    }
    // Obtener la lista de comisiones para encontrar la que corresponde al tipo y precio del producto
    const commissionList = await models.getAllCommissions();
    let matchedComm = 0;
    if (commissionList.length){
        for (let com of commissionList) {
            let matched = false;
            if (com.category === category) {
                switch (com.type) {
                    case 'fijo':        if ( article.includes(com.name) ) {
                                            matchedComm = com.value;
                                            matched = true;
                                        }
                                        break;
                    case 'rango':       if (price >= com.range[0] && price <= com.range[1]) {
                                            matchedComm = com.value;
                                            matched = true;
                                        };
                                        break;
                    case 'porcentaje':  matchedComm = price * com.value;
                                        matched = true;
                                        break;
                    default: matched = false;
                }
            }
            if (matched) {
                return matchedComm;
            }
        }
    }
    return matchedComm;
}

export {
    getCommission
}