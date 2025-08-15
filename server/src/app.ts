import express from 'express';
import cors from 'cors';
import { IAuthService } from '../src/Domain/services/auth/IAuthService';
import { AuthService } from './Services/auth/AuthService';
import { IUserRepository } from './Domain/repositories/users/IUserRepository';
import { UserRepository } from '../src/Database/repositories/UserRepository';
import { AuthController } from '../src/WebApi/controllers/AuthController';
import { IUserService } from './Domain/services/users/IUserService';
import { UserService } from './Services/users/UserService';
import { UserController } from '../src/WebApi/controllers/UserController';
import { IReportRepository } from './Domain/repositories/reports/IReportRepository';
import { ReportRepository } from './Database/repositories/ReportRepository';
import { IReportService } from './Domain/services/reports/IReportService';
import { ReportService } from './Services/reports/ReportService';
import {ReportController} from "../src/WebApi/controllers/ReportController"

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Repositories
const userRepository: IUserRepository = new UserRepository();
const reportRepository: IReportRepository=new ReportRepository();

// Services
const authService: IAuthService = new AuthService(userRepository);
const userService: IUserService = new UserService(userRepository);
const reportService: IReportService=new ReportService(reportRepository);


// WebAPI routes
const authController = new AuthController(authService);
const userController = new UserController(userService);
const reportController=new ReportController();

// Registering routes
app.use('/api/v1', authController.getRouter());
app.use('/api/v1', userController.getRouter());

export default app;