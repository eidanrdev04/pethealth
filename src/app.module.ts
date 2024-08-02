import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< HEAD
=======
import { UsersModule } from 'src/modules/users/users.module';
import { AuthModule } from 'src/modules/auth/auth.module';
>>>>>>> 7f1addfc1007b30505b5cf11053c923136d94494
import { PetsModule } from './modules/pets/pets.module';
import { VaccinationsModule } from './modules/vaccinations/vaccinations.module';
import { VaccinationrecordsModule } from './modules/vaccinationrecords/vaccinationrecords.module';
import { TreatmentsModule } from './modules/treatments/treatments.module';
import { ActivitiesModule } from './modules/activities/activities.module';
import { ConsultationsModule } from './modules/consultations/consultations.module';
<<<<<<< HEAD
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaService } from './modules/prisma/prisma.service';

@Module({
  imports: [UsersModule, AuthModule, PetsModule, VaccinationsModule, VaccinationrecordsModule, TreatmentsModule, ActivitiesModule, ConsultationsModule],
=======

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal:true}),
    UsersModule, AuthModule, PetsModule, VaccinationsModule, VaccinationrecordsModule, TreatmentsModule, ActivitiesModule, ConsultationsModule],
>>>>>>> 7f1addfc1007b30505b5cf11053c923136d94494
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}