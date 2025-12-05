import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { EventsService } from '../../mongo/events/events.service';

@Injectable()
export class ActivityInterceptor implements NestInterceptor {
  constructor(private readonly eventsService: EventsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    const user = req.user || null;
    const path = req.originalUrl;
    const method = req.method;
    const body = req.body;

    return next.handle().pipe(
      tap(() => {
        this.eventsService.create(
          'request_activity',
          {
            path,
            method,
            body,
            user,
          },
          'api',
        );
      }),
    );
  }
}
