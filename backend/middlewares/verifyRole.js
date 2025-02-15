const AppError = require("../utils/appError");

exports.verifyRole = (...role) => {
    return (req, res, next) => {
        if (!role.includes(req.user.role)) {
            const error = new AppError('You do not have permission to perform this action', 403);
            return next(error);
        }
        next();
    };
};