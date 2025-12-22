import { Request, Response } from 'express';
import { studentService } from './student.service';
import { studentRepository } from './student.repository';

export class StudentController {
  static async getAll(req: Request, res: Response) {
    const data = await studentService.getAllStudents();
    res.json(data);
  }

  static async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = await studentService.getStudentById(id);
      res.json(data);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const data = await studentService.createStudent(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Error creating student' });
    }
  }

  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const success = await studentService.deleteStudent(id);
    res.json({ success });
  }

  static async clearDb(req: Request, res: Response) {
    await studentRepository.clearAll();
    res.json({ message: 'Database cleared' });
  }

  static async seedDb(req: Request, res: Response) {
    const count = Number(req.body.count) || 100;
    await studentRepository.seed(count);
    res.json({ message: `Generated ${count} students` });
  }

  static async getStats(req: Request, res: Response) {
    const count = await studentRepository.countAll();
    res.json({ count });
  }
}
