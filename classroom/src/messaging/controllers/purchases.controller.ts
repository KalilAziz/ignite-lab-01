import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CoursesService } from 'src/services/courses.service';
import { EnrollmentService } from 'src/services/enrollments.service';
import { StudentsService } from 'src/services/students.service';

export interface PurchaseCreatedPayload {
  customer: Customer;
  product: Product;
}

export interface Customer {
  authUserId: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
}

@Controller()
export class PurchasesController {
  constructor(
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private enrollmentService: EnrollmentService,
  ) {}

  @EventPattern('purchases.new-purchase')
  async purchaseCreated(@Payload() payload: PurchaseCreatedPayload) {
    // console.log('purchase created');
    // console.log(payload);

    let student = await this.studentsService.getStudentByAuthUserId(
      payload.customer.authUserId,
    );

    if (!student) {
      student = await this.studentsService.createStudent({
        authUserId: payload.customer.authUserId,
      });
    }

    let course = await this.coursesService.getCourseBySlug(
      payload.product.slug,
    );

    if (!course) {
      course = await this.coursesService.createCourse({
        title: payload.product.title,
      });
    }

    await this.enrollmentService.createEnrollment({
      studentId: student.id,
      courseId: course.id,
    });
  }
}
