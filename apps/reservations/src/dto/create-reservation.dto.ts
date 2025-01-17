import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

/* eslint-disable prettier/prettier */
export class CreateReservationDto {
    @IsDate()
    @Type(() => Date)
    startDate: Date;

    @IsDate()
    @Type(() => Date)
    endDate: Date;

    @IsNotEmpty()
    @IsString()
    placeId: string;

    @IsNotEmpty()
    @IsString()
    invoiceId: string;
}
