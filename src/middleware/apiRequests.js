module.exports = function makeMiddleWare({
    controller,
}) {
    return async function middleWare(req, res) {
        const apiRequestMiddleware = {
            body: req.body,
            headers: req.header,
            params: req.params,
        }

        // calling controller from after passing all required validations
        try {
            await controller(apiRequestMiddleware);
        } catch (error) {
            console.info({error});
        }
    }
}