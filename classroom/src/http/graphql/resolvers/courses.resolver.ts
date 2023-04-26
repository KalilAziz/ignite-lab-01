import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Course } from '../models/course';
import { CoursesService } from 'src/services/courses.service';
import { CreateCourseInput } from '../input/create-course-input';
import { AuthorizationGuard } from 'src/http/authorization/authorization.guard';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthUser, CurrentUser } from 'src/http/authorization/current-user';
import { StudentsService } from 'src/services/students.service';
import { EnrollmentService } from 'src/services/enrollments.service';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private coursesSercice: CoursesService,
    private studentService: StudentsService,
    private enrollmentService: EnrollmentService,
  ) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.coursesSercice.listAllCourses();
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  async course(@Args('id') id: string, @CurrentUser() user: AuthUser) {
    const student = await this.studentService.getStudentByAuthUserId(user.sub);

    if (!student) {
      throw new Error('Student not found');
    }

    const enrollment = await this.enrollmentService.getByCourseAndStudentId({
      courseId: id,
      studentId: student.id,
    });

    if (!enrollment) {
      throw new UnauthorizedException();
    }

    return this.coursesSercice.getCourseById(id);
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  createCourse(@Args('data') data: CreateCourseInput) {
    const { title } = data;

    return this.coursesSercice.createCourse({ title });
  }
}
