import { studentRepository } from '@/student/student.repository';
import { CreateStudentDto } from './dto/create-student.dto';

class StudentService {
  async getAllStudents() {
    return await studentRepository.findAll();
  }

  async getStudentById(id: number) {
    const student = await studentRepository.findById(id);
    if (!student) {
      throw new Error(`Student with id ${id} not found`);
    }
    return student;
  }

  async createStudent(dto: CreateStudentDto) {
    return await studentRepository.create(dto);
  }

  async deleteStudent(id: number) {
    return await studentRepository.delete(id);
  }
}

export const studentService = new StudentService();
