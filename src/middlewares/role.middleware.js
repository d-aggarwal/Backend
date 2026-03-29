import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * Middleware to verify user role
 * Usage: verifyRole(["admin"]) or verifyRole(["admin", "moderator"])
 * Must be used after verifyJWT middleware
 */
export const verifyRole = (requiredRoles) => {
    return asyncHandler(async (req, _, next) => {
        if (!req.user) {
            throw new ApiError(401, "User not authenticated");
        }

        if (!requiredRoles.includes(req.user.role)) {
            throw new ApiError(403, `Access denied. Required role: ${requiredRoles.join(" or ")}`);
        }

        next();
    });
};
