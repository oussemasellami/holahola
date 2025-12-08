import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class UserfilterInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
const request=context.switchToHttp().getRequest()

const role=request.headers?.role
console.log('role',role)

    return next.handle().pipe(map((data)=>{

      const filteruser =(user:any)=>{

        if(role==='admin' && user.role==='admin'){
          return{
            username:user.username,
            email:user.email,
            role:user.role,

          }
          
        }
        if(role==='client' && user.role==='client'){
          return{
              email:user.email,
              role:user.role,
          }
        }
  return null
      }

      if(Array.isArray(data)){

        return data.map(filteruser).filter(Boolean)
      }
      console.log('data'+JSON.stringify(data))
      return filteruser(data)


    }));
  }
}
