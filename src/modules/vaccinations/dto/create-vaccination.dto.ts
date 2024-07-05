import { Decimal } from "@prisma/client/runtime/library";

export class CreateVaccinationDto {
    name: string;
    applicationDate: Date;
    weight: Decimal;
    petId: number;
    vaccinationRecordId: number;
}