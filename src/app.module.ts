import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { PetsModule } from './modules/pets/pets.module';
import { VaccinationsModule } from './modules/vaccinations/vaccinations.module';
import { VaccinationrecordsModule } from './modules/vaccinationrecords/vaccinationrecords.module';
import { TreatmentsModule } from './modules/treatments/treatments.module';
import { ActivitiesModule } from './modules/activities/activities.module';
import { ConsultationsModule } from './modules/consultations/consultations.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal:true}),
    UsersModule, AuthModule, PetsModule, VaccinationsModule, VaccinationrecordsModule, TreatmentsModule, ActivitiesModule, ConsultationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
