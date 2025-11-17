export function checkRole(allowedRoles = []) {
    return (req, res, next) => {
        try {
            const userRole = req.user?.role;

            if (!userRole) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized: user role not found",
                });
            }

            if (!allowedRoles.includes(userRole)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden: you do not have permission for this action",
                });
            }

            next();
        } catch (error) {
            next(error);
        }
    };
}
