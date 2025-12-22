import { Router } from 'express';
import { StudentController } from '@/student/student.controller';

const router = Router();

// CRUD
router.get('/students', StudentController.getAll);
router.get('/students/:id', StudentController.getOne);
router.post('/students', StudentController.create);
router.delete('/students/:id', StudentController.delete);

// ADMIN
router.post('/admin/clear', StudentController.clearDb);
router.post('/admin/seed', StudentController.seedDb);
router.get('/admin/stats', StudentController.getStats);

export const restRouter = router;
