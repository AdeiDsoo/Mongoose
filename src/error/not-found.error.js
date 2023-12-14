export default class NotFoundError{
    static createError(entity){
        const error=new Error (`${entity} not found`)
        error.name="notFoundError"
        throw error
    }

}