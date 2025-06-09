import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            // Unificamos el formato de error
            return res.status(400).json({ errors: ['User not found'] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            // Unificamos el formato de error
            return res.status(400).json({ errors: ['Invalid credentials'] }); // Más genérico por seguridad
        }

        const token = await createAccessToken({ id: user._id });

        // Establecemos la cookie
        res.cookie("token", token, {
            httpOnly: false,
            secure: true, 
            sameSite: 'none', 
            maxAge: 3600000 
        });

        // Respuesta exitosa
        res.status(200).json({
            message: "Authentication successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            token: token // Se recomienda no enviar el token en la respuesta si ya lo envías en la cookie HTTP Only
        });
    } catch (error) {
        console.error("Login error:", error); // Para depuración
        return res.status(500).json({ errors: ['An unexpected error occurred during login'] });
    }
};

export const register = async (req, res) => {
    const { email, password, username } = req.body;
    try {
        const userFound = await User.findOne({ email });
        if (userFound) {
            // Unificamos el formato de error
            return res.status(400).json({ errors: ['Email already exists'] });
        }

        const passwordhash = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: username,
            email: email,
            password: passwordhash,
        });

        const userSave = await newUser.save();
        const token = await createAccessToken({ id: userSave._id });

        // Establecemos la cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 3600000 // 1 hora de duración
        });

        // Respuesta exitosa
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: userSave._id,
                username: userSave.username,
                email: userSave.email,
            },
            token: token // Se recomienda no enviar el token en la respuesta si ya lo envías en la cookie HTTP Only
        });
    } catch (error) {
        console.error("Registration error:", error); // Para depuración
        return res.status(500).json({ errors: ['An unexpected error occurred during registration'] });
    }
};

export const logout = async (req, res) => {
    // Limpiamos la cookie del token
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
    });
    res.status(200).json({
        message: "User logged out successfully"
    });
};

export const profile = async (req, res) => {
    // req.user.id viene del middleware de autenticación
    const user = await User.findById(req.user.id);
    if (!user) {
        // Unificamos el formato de error
        return res.status(404).json({ errors: ['User profile not found'] }); // 404 si no se encuentra el perfil
    }
    res.status(200).json({
        message: "User profile retrieved successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    });
};


export const verifyToken = async (req, res) => {
    console.log("Verifying token...");
    const {token}=req.cookies;
    if (!token) return res.status(401).json({ errors: ['No token provided'] });
    jwt.verify(token, JWT_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ errors: ['Invalid token'] });
        try {
            const userFound = await User.findById(user.id);
            if (!userFound) return res.status(404).json({ errors: ['User not found'] });
            return res.status(200).json({
                id: userFound._id,
                username: userFound.username,
                email: userFound.email,
                createdAt: userFound.createdAt,
                updatedAt: userFound.updatedAt
            });
        } catch (error) {
            console.error("Error verifying token:", error);
            return res.status(500).json({ errors: ['An unexpected error occurred'] });
        }
    });
 
}