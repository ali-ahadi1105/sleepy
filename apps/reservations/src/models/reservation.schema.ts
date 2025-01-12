/* eslint-disable prettier/prettier */
import { Schema } from "@nestjs/mongoose";

@Schema({ versionKey: false })
export class ReservationDocument {
    timestamp: Date;
    startDate: Date;
    endDate: Date;
    userId: string;
    placeId: string;
    invoiceId: string;
}
