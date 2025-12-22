import express from 'express';
import cors from 'cors';
import * as soap from 'soap';
import fs from 'fs';
import path from 'path';
import { restRouter } from '@/routes';
import { soapService } from '@/student/soap/student.soap';
import { initDb } from '@/database';

const app = express();
const PORT = 8000;

initDb();

app.use(cors());
app.use(express.json());

// 1. REST API
app.use('/api', restRouter);

// 2. SOAP API
const wsdlPath = path.join(__dirname, 'student/soap/student.wsdl');
const wsdlXml = fs.readFileSync(wsdlPath, 'utf8');

app.listen(PORT, () => {
  // Инициализация SOAP
  soap.listen(app, '/soap', soapService, wsdlXml, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`REST Endpoint: http://localhost:${PORT}/api/students`);
    console.log(`SOAP WSDL:     http://localhost:${PORT}/soap?wsdl`);
  });
});
