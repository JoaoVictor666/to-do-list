const validateTitle = (request, response, next) => {
    const { body } = request
    if (body.title === undefined) {
        return response.status(400).json({ message: "Th files title is require"})
    }

    if (body.title === "") {
        return response.status(400).json({ message: "need fill this camp"})
    }
    next()
}
const validateFieldStatus = (request, response, next) => {
    const { body } = request;

    if (body.status === undefined) {
        return response.status(400).json({ message: "The field 'status' is required" });
    }

    if (body.status === "") {
        return response.status(400).json({ message: "The field 'status' cannot be empty" });
    }

    next();
};

module.exports = {
    validateTitle,
    validateFieldStatus,
};
