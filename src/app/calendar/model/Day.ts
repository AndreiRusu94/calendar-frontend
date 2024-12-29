import { Appointment } from "./Appointment";
import { Goal } from "./Goal";

export class Day {

  startDate: Date
  isCrossedOff: boolean
  appointments: Appointment[]
  number: number
  goals: Goal[]
}
