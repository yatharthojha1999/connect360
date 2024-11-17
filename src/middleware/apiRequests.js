module.exports = function makeMiddleWare({
    controller,
}) {
    return async function middleWare(req, res) {
        const apiRequestMiddleware = {
            body: req.body,
            headers: req.headers,
            params: req.params,
        }

        // calling controller after passing all required validations
        try {
            await controller(apiRequestMiddleware);
        } catch (error) {
            console.info({error});
        }
    }
}