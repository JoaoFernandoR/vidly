// Não estamos utilizando esse middleware pois instalamos a biblioteca express-async-errors
// que faz isso automaticamente para a aplicação.

const asyncMiddleware = (handler) => { 
	return async (req, res, next) => {
		try {
			await handler(req, res)
		}
		catch(ex){
			next(ex)
		}	
	}	
}

module.exports = asyncMiddleware