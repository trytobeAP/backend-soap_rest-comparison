import { db } from '@/database';
import { Student } from './entity/student.entity';

class StudentRepository {
  async countAll(): Promise<number> {
    return new Promise((resolve, reject) => {
      db.get('SELECT COUNT(*) as count FROM students', (err, row: any) => {
        if (err) reject(err);
        else resolve(row.count);
      });
    });
  }

  async findAll(): Promise<Student[]> {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM students';
      db.all(sql, [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows as Student[]);
      });
    });
  }

  async findById(id: number): Promise<Student | undefined> {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM students WHERE id = ?';
      db.get(sql, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row as Student);
      });
    });
  }

  async create(data: Omit<Student, 'id'>): Promise<Student> {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO students (name, specialization, course) VALUES (?, ?, ?)';
      db.run(sql, [data.name, data.specialization, data.course], function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, ...data } as Student);
      });
    });
  }

  async delete(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM students WHERE id = ?';
      db.run(sql, [id], function (err) {
        if (err) reject(err);
        else resolve(this.changes > 0);
      });
    });
  }

  async clearAll(): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM students', (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  async seed(count: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const specializations = ['IT', 'DevOps', 'QA', 'Design', 'Manager', 'Analyst'];

      db.serialize(() => {
        db.run('BEGIN TRANSACTION');

        const stmt = db.prepare(
          'INSERT INTO students (name, specialization, course) VALUES (?, ?, ?)'
        );

        for (let i = 0; i < count; i++) {
          const name = `Student ${Math.floor(Math.random() * 10000)}`;
          const spec = specializations[Math.floor(Math.random() * specializations.length)];
          const course = Math.floor(Math.random() * 5) + 1;
          stmt.run(name, spec, course);
        }

        stmt.finalize();

        db.run('COMMIT', (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    });
  }
}

export const studentRepository = new StudentRepository();
