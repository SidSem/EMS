export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Access Denied: You do not have permission to perform this action"
            });
        }
        next();
    };
};
