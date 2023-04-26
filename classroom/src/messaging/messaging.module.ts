import { Module } from '@nestjs/common';
import { PurchasesController } from './controllers/purchases.controller';
import { StudentsService } from 'src/services/students.service';
import { CoursesService } from 'src/services/courses.service';
import { EnrollmentService } from 'src/services/enrollments.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PurchasesController],
  providers: [StudentsService, CoursesService, EnrollmentService],
})
export class MessagingModule {}
