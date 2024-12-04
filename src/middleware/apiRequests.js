module.exports = function makeMiddleWare({
    controller,
}) {
    return async function middleWare(req, res) {
        const apiRequestMiddleware = {
            body: req.body,
            headers: req.headers,
            params: req.params,
            userId: 1, // TODO: change this from static to dynamic.
        }

        // calling controller after passing all required validations
        try {
            const data = await controller(apiRequestMiddleware);
            res.send(data)
        } catch (error) {
            console.info({error});
        }
    }
}