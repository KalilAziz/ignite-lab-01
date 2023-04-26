import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Student } from '../models/student';
import { StudentsService } from 'src/services/students.service';
import { Enrollment } from '../models/enrollment';
import { EnrollmentService } from 'src/services/enrollments.service';

import { AuthorizationGuard } from 'src/http/authorization/authorization.guard';

import { UseGuards } from '@nestjs/common';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private studentsService: StudentsService,
    private enrollmentService: EnrollmentService,
  ) {}

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentsService.listAllStudents();
  }

  @ResolveField(() => [Enrollment])
  enrollments(@Parent() student: Student) {
    console.log(student);
    return this.enrollmentService.listEnrollmentByStudentId(student.id);
  }
}
