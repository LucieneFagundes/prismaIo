import { Request, Response } from "express";
import { FindAllAvailableUseCase } from "./FindAllAvailableUseCase";


export class FindAllAvailableController {
  async handle(request: Request, response: Response) {
    const findAllAvailableUseCase = new FindAllAvailableUseCase();

    const deliveries = await findAllAvailableUseCase.execute();

    return response.status(200).json(deliveries)
  }
}