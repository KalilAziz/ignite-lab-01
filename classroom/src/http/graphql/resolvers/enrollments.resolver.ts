import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Enrollment } from '../models/enrollment';
import { EnrollmentService } from 'src/services/enrollments.service';
import { CoursesService } from 'src/services/courses.service';
import { StudentsService } from 'src/services/students.service';
import { Student } from '../models/student';
import { Course } from '../models/course';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(
    private enrollmentService: EnrollmentService,
    private coursesService: CoursesService,
    private studentsService: StudentsService,
  ) {}

  @Query(() => [Enrollment])
  // @UseGuards(AuthorizationGuard)
  enrollments() {
    return this.enrollmentService.listAllEnrollments();
  }

  @ResolveField(() => Student)
  student(@Parent() enrollment: Enrollment) {
    return this.studentsService.getStudentById(enrollment.studentId);
  }

  @ResolveField(() => Course)
  course(@Parent() enrollment: Enrollment) {
    return this.coursesService.getCourseById(enrollment.courseId);
  }
}
