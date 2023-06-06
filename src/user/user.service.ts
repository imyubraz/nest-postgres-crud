import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions } from 'typeorm';



@Injectable()
export class UserService {
  // Injecting user repository (via constructor)
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}
    // after injecting user repo (db) we can perform add, read, update & delete actions

  create(createUserDto: CreateUserDto): Promise<User> {
    let user: User = new User();
      // instance/ obj from User entity (each instance maps each record in db )

    // createUserDto is data passed from client expected of type CreateUserDto as defined earlier
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.age = createUserDto.age;
    // left one for db column, right one for value of respective column

    return this.userRepository.save(user);
      // saving user obj (a record) in userRepository
      // return promise (on resolve it will give data of User type)
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    const options: FindOneOptions<User> = {
      where: { id: id },
    };
    return this.userRepository.findOne(options);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    let user: User = new User();
    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;
    user.age = updateUserDto.age;
    user.id = id;
      /*
      passing id too, 
      here this.userRepository.save() execute in two ways :
        If entity (with id provided) does not exist in the database then inserts, otherwise updates. 
      */
    return this.userRepository.save(user);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
