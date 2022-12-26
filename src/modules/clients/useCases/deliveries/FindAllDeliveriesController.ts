import { Request, Response } from "express";
import { FindAllDeliveriesUseCase } from "./FindAllDeliveriesUseCase";

export class FindAllDeliveriesController {
  async handle(request: Request, response: Response){
    const { id_client } = request;
    const findAllDeliveriesUseCase = new FindAllDeliveriesUseCase();
    const deliveries = await findAllDeliveriesUseCase.execute(id_client);

    return response.status(200).json(deliveries)
  }
}