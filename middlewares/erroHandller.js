/* Tratamento de erro nao encontrado */

const notFound = (req, res, next) => {
    const error = new Error(`Rota Não encontrada: ${req.originalUrl}`);
    res.status(400);
    next(error);
};

/* Erro Tratamento */

const handlerError = (err, req, res, next) => {
    const statuscode = res.statuScode ? res.statuScode: 500;
    res.status(statuscode);
    res.json({
        status: false,
        message: err?.message,
        stack: err?.stack
    });

};

module.exports = { handlerError, notFound};