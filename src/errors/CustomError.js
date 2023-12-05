class CustomError {
    static createError({name='Error', cause, message, code=1}){
        let error = new Error(message)
        error.message.name = name
        error.code = code
        error.cause = cause
        throw error
    }
}

export default CustomError