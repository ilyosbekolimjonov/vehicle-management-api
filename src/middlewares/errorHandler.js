export function errorHandler(err, req, res, next) {
    console.error("ERR:", err);

    res.status(err.status || 500).json({
        message: err.message || "Internal server error",
    });
}
