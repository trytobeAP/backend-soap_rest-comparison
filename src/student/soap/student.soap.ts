import { studentService } from '@/student/student.service';

export const soapService = {
  StudentService: {
    StudentPort: {
      getStudent: async function (args: { id: string }) {
        const student = await studentService.getStudentById(Number(args.id));
        return { student }; // Оборачиваем в объект, как в WSDL
      },

      getStudents: async function () {
        const students = await studentService.getAllStudents();
        return { students }; // Возвращаем объект { students: [...] }
      },

      createStudent: async function (args: {
        name: string;
        specialization: string;
        course: string;
      }) {
        const newStudent = await studentService.createStudent({
          name: args.name,
          specialization: args.specialization,
          course: Number(args.course),
        });
        return { student: newStudent };
      },
    },
  },
};
