import { Router } from 'express';
import { CreateStudent, readStudent, updateStudent, deleteStudent } from '../controller/student.controller';
import { loginValidate } from '../middleware/login.middleware';

const router = Router();

router.post('/create-student', [loginValidate], CreateStudent);
router.get('/read-student', readStudent);
router.put('/update-student/:id', updateStudent);
router.delete('/delete-student/:id', deleteStudent);

export default router;