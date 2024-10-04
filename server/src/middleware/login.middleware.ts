import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'format email tidak valid',
        'any.required': 'email wajib diisi'
    }),
    password: Joi.string().min(1).required().messages({
        'string.min': 'password minimal harus 1 karakter',
        'any.required': 'password wajib diisi'
    })
})

const loginValidate = (req: Request, res: Response, next: NextFunction) => {
 const validate = loginSchema.validate(req.body)
 if (validate.error) return res.status(400).json({message: validate.error.details.map(item => item.message).join()})
    return next()
}

export {loginValidate}