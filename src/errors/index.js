import EErrors from "./enums.js"

const errorHandleMidd = (error, req, res, next) => {
    console.log(error,cause)
    switch (error.code) {
        case EErrors.INVALID_TYPE_ERROR:
            return res.send({status: 'error', error: error.name})
            break;
        case EErrors.INVALID_REQUEST:
            return res.send({status: 'error', error: error.name})
            break;
        default:
            return res.status(500).send({status: 'error', error: 'Error de server'})
            break;
    }
}

export default errorHandleMidd