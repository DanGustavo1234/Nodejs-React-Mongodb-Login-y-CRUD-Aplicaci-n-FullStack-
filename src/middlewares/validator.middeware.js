

export const validateSchema= (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        return res.status(500).json({ error: error.errors.map(err => err.message) });
    }
}


