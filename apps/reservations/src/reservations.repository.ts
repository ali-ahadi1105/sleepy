/* eslint-disable prettier/prettier */
import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { ReservationDocument } from "./models/reservation.schema";

@Injectable()
export class ReservationsRepository extends AbstractRepository<ReservationDocument> {
    protected logger: Logger;
}